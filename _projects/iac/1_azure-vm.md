---
layout: page
title: Azure VM Scale Set Web App Behind Standard Load Balancer
description: Production-style Azure infrastructure provisioned with Terraform
img: assets/img/p_azure_vm/vmss_tf.png
importance: 1
category: infrastructure-as-code
related_publications: false
---

Production-style Azure infrastructure provisioned with Terraform: a **Linux VM Scale Set (VMSS Flexible / Orchestrated)** running a simple Apache web app, served through a **Public Standard Load Balancer**, protected by a **locked-down NSG**, and backed by **CPU-based autoscaling**. Optional **NAT Gateway** provides predictable outbound egress.

---

## What this project delivers

This repo provisions a scalable web tier in Azure with:

- **Resource Group** in an allowed region only:
  - `East US`, `West Europe`, `Southeast Asia`
- **Networking**
  - Virtual Network (VNet)
  - Two subnets:
    - **App subnet** (VMSS runs here)
    - **Mgmt subnet** (reserved for future jumpbox/Bastion/management tooling)
  - **Network Security Group** attached to App subnet using **dynamic blocks**
    - Allows:
      - HTTP probe traffic from `AzureLoadBalancer` to port `80`
      - Actual user HTTP traffic to port `80` (see “Important NSG note”)
    - Denies all other inbound
- **Compute**
  - **VMSS (Ubuntu 20.04 LTS)** using environment-based sizes via `lookup()`:
    - dev: `Standard_B1s`
    - stage: `Standard_B2s`
    - prod: `Standard_B2ms`
  - Bootstrap via `user-data.sh` (cloud-init user-data)
- **Load Balancing**
  - Public Standard Load Balancer
  - Backend pool attached to VMSS NICs
  - Health probe on port 80
  - LB rules created via `for_each` (dynamic rule list)
- **Autoscaling**
  - Scale out: CPU > 80%
  - Scale in: CPU < 10%
  - Min instances: 2
  - Max instances: 5
- **Outbound**
  - Optional **NAT Gateway** + Public IP for stable outbound connectivity

---

## Architecture

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p_azure_vm/vmss_tf.png" title="Architecture" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Architecture!
</div>

---

## Important NSG note

A common pitfall with **Standard Load Balancer** is assuming that “only allow `AzureLoadBalancer` to port 80” is enough.

* The **health probe** arrives with source `AzureLoadBalancer`.
* The **real client traffic** forwarded to the backend typically preserves the **original client source IP**.
* If your NSG allows only `AzureLoadBalancer`, your probe may succeed but **real user traffic gets blocked**, resulting in LB endpoint timeouts.

Working ruleset used in this project:

* Allow `AzureLoadBalancer` → `80` (probe/platform)
* Allow `Internet` → `80` (real client traffic)
* Deny all other inbound

You can tighten `Internet` to a trusted CIDR later if needed (e.g., office VPN IP range).

---

## Repository structure

Typical layout in this repo:

* `provider.tf` – Terraform + provider constraints
* `backend.tf` – Remote state backend configuration (Azure Storage)
* `variables.tf` – Input variables + validations (including allowed regions)
* `locals.tf` – Naming, tags, env-based VM sizing, dynamic rule lists
* `terraform.tfvars` – Environment configuration (not committed if it contains secrets)
* `vnet.tf` – RG + VNet + subnets + NSG + Load Balancer resources
* `vmss.tf` – VMSS definition (Ubuntu 20.04, cloud-init user data)
* `autoscale.tf` – Azure Monitor autoscale settings
* `nat.tf` – NAT Gateway + public IP + subnet association (optional)
* `outputs.tf` – LB FQDN/IP and NAT egress IP
* `user-data.sh` – Bootstrap Apache + sample page

---

## Prerequisites

* Terraform `>= 1.9.0`
* Azure CLI (logged in)
* Azure subscription with permissions to create:

  * Resource groups, networking, load balancer, VMSS, monitor autoscale
* SSH key pair (`.pub` file) for VMSS admin access (even if you don’t open SSH inbound)

---

## Authentication options

### Option A: Interactive (developer laptop)
{% raw %}
```bash
az login
az account set --subscription "<SUBSCRIPTION_ID>"
```
{% endraw %}

### Option B: Service Principal (recommended for CI/CD)

Create SP and export the standard Terraform ARM variables:

{% raw %}
```bash
az ad sp create-for-rbac -n az-demo --role="Contributor" --scopes="/subscriptions/$SUBSCRIPTION_ID"
```
{% endraw %}

{% raw %}
```bash
export ARM_CLIENT_ID="..."
export ARM_CLIENT_SECRET="..."
export ARM_SUBSCRIPTION_ID="..."
export ARM_TENANT_ID="..."
```
{% endraw %}

---

## Remote state backend (recommended)

This project uses an **Azure Storage Account backend** to store the Terraform state safely in the cloud.

### 1. Create backend resources (one-time)

Example script (similar to your `backend.sh`):

{% raw %}
```bash
RESOURCE_GROUP_NAME=tfstate-vmss
STORAGE_ACCOUNT_NAME=vmss<unique>
CONTAINER_NAME=tfstate

az group create --name $RESOURCE_GROUP_NAME --location eastus
az storage account create --resource-group $RESOURCE_GROUP_NAME --name $STORAGE_ACCOUNT_NAME --sku Standard_LRS
az storage container create --name $CONTAINER_NAME --account-name $STORAGE_ACCOUNT_NAME
```
{% endraw %}

### 2. Configure `backend.tf`

{% raw %}
```hcl
terraform {
  backend "azurerm" {
    resource_group_name  = "tfstate-vmss"
    storage_account_name = "vmss27651"
    container_name       = "tfstate"
    key                  = "dev.terraform.tfstate"
  }
}
```
{% endraw %}

### 3. Initialize Terraform

{% raw %}
```bash
terraform init
```
{% endraw %}

---

## Configuration

### `terraform.tfvars` example

{% raw %}
```hcl
environment          = "dev"
region               = "East US"            # must be exactly one of: East US, West Europe, Southeast Asia
resource_name_prefix = "vmssproject"

instance_count = 2

vnet_address_space   = ["10.0.0.0/16"]
app_subnet_prefixes  = ["10.0.0.0/20"]
mgmt_subnet_prefixes = ["10.0.16.0/20"]

admin_username       = "azureuser"
ssh_public_key_path  = "~/.ssh/id_ed25519.pub"

nat_gateway_enabled        = true
nat_idle_timeout_minutes   = 10
```
{% endraw %}

> Tip: Prefer `ssh_public_key_path` over embedding keys as plain strings.

---

## Deploy (reproducibility)

### 1. Format & validate

{% raw %}
```bash
terraform fmt -recursive
terraform validate
```
{% endraw %}


### 2. Plan

{% raw %}
```bash
terraform plan
```
{% endraw %}

### 3. Apply

{% raw %}
```bash
terraform apply --auto-approve
```
{% endraw %}

### 4. Verify outputs
{% raw %}
```bash
terraform output lb_fqdn
terraform output lb_public_ip
terraform output nat_public_ip
```
{% endraw %}

### 5. Test the application
{% raw %}
```bash
curl -I "http://$(terraform output -raw lb_public_ip)"
curl -I "http://$(terraform output -raw lb_fqdn)"
```
{% endraw %}

If successful, you should receive an HTTP response (e.g., `200 OK` or `301/302` depending on Apache config).

---

## How the VMSS is configured

### OS image

* Ubuntu **20.04 LTS** (Canonical, `0001-com-ubuntu-server-focal`, `20_04-lts-gen2`)

### SSH key usage (why it’s required)

The VMSS uses:

* `disable_password_authentication = true`
* An SSH public key for secure admin access

Even if you do not expose SSH inbound, this is still best practice because:

* It hardens the VM against password attacks
* It enables emergency access (e.g., via private management network, Bastion, or run-command workflows)

---

## Autoscaling behavior

Autoscale uses Azure Monitor metrics on the VMSS:

* **Scale out** by +1 when average CPU > 80% over 5 minutes
* **Scale in** by -1 when average CPU < 10% over 5 minutes
* Min/Max capacity enforced: 2 to 5

---

## NAT Gateway (why we include it)

NAT Gateway provides predictable outbound behavior for workloads that need internet access (updates, package downloads, external APIs):

* Stable outbound IP (useful for allowlisting)
* Better control vs implicit/ephemeral outbound

In this architecture:

* VMs do **not** have public IPs
* Inbound is only via Load Balancer
* Outbound is through NAT Gateway (optional but production-friendly)

---

## Availability zones & region realities

### Why zones can cause deployment failures

In some subscriptions/regions:

* Certain VM sizes are not available in specific zones
* Overconstrained requests happen when you pin:

  * a specific VM size **and**
  * a specific zone **and**
  * capacity is temporarily constrained

### Production guidance

You have two valid strategies:

1. **Regional deployment (simpler, fewer failures)**

   * Do not set `zones`
   * Use a regional Standard LB + regional resources
   * Set `platform_fault_domain_count` appropriately as required by the resource

2. **Zonal deployment (higher resilience, requires strict zone alignment)**

   * Pin VMSS zone(s) carefully
   * NAT Gateway + NAT Public IP must use the **same zone** when zonal
   * Expect occasional SKU/zone capacity issues; be ready to change VM size or zone

---

## Troubleshooting

### 1. LB endpoint times out

Most common causes:

* Apache not running / user-data failed
* NSG blocking real client traffic (fixed by allowing `Internet` → `80`)

### 2. Azure CLI “backend health” commands

Azure Standard Load Balancer does not expose a simple `show-backend-health` command in the same way Application Gateway does.
Use:

* VM-side checks (cloud-init logs, apache status)
* Azure Monitor metrics (LB probe status / data path metrics)
* Ensure NSG rules allow traffic correctly

### 3. Subnet cannot be deleted during destroy

If you see: `InUseSubnetCannotBeDeleted`
It means something (NIC/VMSS) still exists inside the subnet.
Delete dependent compute resources first or ensure Terraform state includes them.

### 4. “NetworkWatcherRG” appeared

Azure may automatically create **NetworkWatcherRG** per region. It’s created by Azure platform services, not by your Terraform code directly.
It’s typically minimal cost unless you enable paid diagnostics/traffic analytics. You usually don’t need to delete it.

---

## Clean up

Destroy all resources created by Terraform:
{% raw %}
```bash
terraform destroy --auto-approve
```
{% endraw %}

If something remains due to partial state or manual changes:

* Inspect Azure Portal for remaining resources in the RG
* Import missing resources into state or delete manually with care

---

## Outputs

* `lb_fqdn` – Public DNS name of the Load Balancer
* `lb_public_ip` – Public IP of the Load Balancer
* `nat_public_ip` – Outbound egress public IP (when NAT is enabled)

---

## Next improvements (optional)

* Add HTTPS (TLS termination via Application Gateway or NGINX in VMSS)
* Add Azure Bastion in mgmt subnet (secure admin access without opening SSH)
* Add diagnostics: Log Analytics + VMSS boot diagnostics + LB metrics alerts
* Add CI pipeline (GitHub Actions) for `fmt`, `validate`, `plan` on PRs
* Add per-environment tfvars and workspace strategy (`dev`, `stage`, `prod`)
