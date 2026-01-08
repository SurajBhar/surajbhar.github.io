---
layout: distill
title: AI Systems Periodic Table
description: A practical framework to think about modern AI like chemistry — reusable components (LLMs, RAG, agents, guardrails) that combine into predictable reference architectures, including MCP-based tool integration.
tags: ai-systems ai-ml
categories: ai-ml
giscus_comments: false
date: 2026-01-08 09:00:00
featured: true # <-- Pinned!

authors:
  - name: Suraj Bhardwaj
    url: "https://surajbhar.github.io/"
    affiliations:
      name: AI Engineer & Researcher

toc:
  - name: Why a “Periodic Table” for AI Systems?
  - name: How to Read the Table
    subsections:
      - name: Columns (Families / Groups)
      - name: Rows (Maturity)
      - name: The Key Idea- Predict Reactions
  - name: The AI Systems Periodic Table
    subsections:
      - name: Element Map (Symbols Used in “Reaction Formulas”)
  - name: Detailed Explanation (Element Catalog)
    subsections:
      - name: Row 1 — Primitive
      - name: Row 2 — Composition
      - name: Row 3 — Deployment
      - name: Row 4 — Emerging
  - name: 10 Canonical Reactions (Reference Architectures)
    subsections:
      - name: Reaction 1 — Secure Documentation Chatbot (Production RAG)
      - name: Reaction 2 — Agentic Travel Booking (Think–Act–Observe)
      - name: Reaction 3 — SQL Analytics Copilot over a Data Warehouse
      - name: Reaction 4 — Codebase Assistant with GitHub (PR-aware)
      - name: Reaction 5 — Multimodal Image Generation Studio (Text-to-Image)
      - name: Reaction 6 — Document Understanding & Extraction (Invoices, Forms)
      - name: Reaction 7 — Customer Support Autopilot (Triage + Draft + CRM Update)
      - name: Reaction 8 — Security Operations Copilot (Alert Investigation)
      - name: Reaction 9 — Multi-agent Research & Writing System
      - name: Reaction 10 — On-device Assistant with Local RAG Sync
  - name: Practical Tips (What Works in Real Builds)
  - name: References
  - name: Want to collaborate?
---


> **TL;DR**  
> Real-world AI products are not “just an LLM.” They are **systems** assembled from reusable components—like chemistry.  
> A periodic table is valuable not for memorization, but for **predicting reactions**: which parts combine well, where failures happen, and what validation makes systems trustworthy.

**Connect:** [LinkedIn](https://www.linkedin.com/in/bhardwaj-suraj/) • [GitHub](https://github.com/SurajBhar) • [Website](https://surajbhar.github.io/)

**Inspiration / credit:** This work is inspired by the IBM-style “AI Periodic Table” explained by Martin Keen (IBM).  
Video: https://www.youtube.com/watch?v=ESBMgZHzfG0

---

## Why a “Periodic Table” for AI Systems?

AI discussions often reduce everything to a single ingredient: *the model*.  
But production systems need more than raw generation capability:

- **Grounding** (so answers map to evidence)
- **Memory** (so the system “knows” your domain)
- **Tool use** (so it can fetch real-time data or take actions)
- **Safety and governance** (so it doesn’t leak secrets or do unsafe actions)
- **Reliability** (so you can ship, monitor, and improve)

This periodic-table framing gives teams a shared language to design systems as **compositions** of components—with predictable interactions.

---

## How to Read the Table

### Columns (Families / Groups)
- **Group 1 — Reactive:** Components that translate intent into behavior (prompts → tools → agents → multi-agent).
- **Group 2 — Retrieval:** Components that provide memory and knowledge access (embeddings, vector search, RAG, fine-tuning as weight-memory, synthetic data).
- **Group 3 — Orchestration:** Components that coordinate steps and connect capabilities (chains, RAG pipelines, frameworks, interoperability like MCP).
- **Group 4 — Validation:** Components that reduce risk and increase trust (schemas, guardrails, red teaming, interpretability).
- **Group 5 — Models:** The engines (LLMs, multimodal models, small models, thinking models).

### Rows (Maturity)
- **Row 1 — Primitive:** Core building blocks (prompting, embeddings, chaining, constraints, base models).
- **Row 2 — Composition:** Common “product recipes” (function calling, vector DB, RAG, guardrails, multimodal).
- **Row 3 — Deployment:** What you need to ship and operate reliably (agents, fine-tuning, frameworks, red teaming, small models).
- **Row 4 — Emerging:** Rapidly evolving capabilities (multi-agent, synthetic data at scale, MCP, interpretability, thinking models).

### The Key Idea- Predict Reactions
A practical system is a **reaction** that combines elements across columns (often across several rows).  
The table helps you ask: *Which ingredients do we need to achieve a specific product outcome under constraints (latency, cost, security, compliance)?*

---

## The AI Systems Periodic Table
![AI Systems Periodic Table (placeholder)](/assets/img/blogs/ai_periodic_table.png)

### Element Map (Symbols Used in “Reaction Formulas”)

| Row | Group 1 (Reactive) | Group 2 (Retrieval) | Group 3 (Orchestration) | Group 4 (Validation) | Group 5 (Models) |
|---|---|---|---|---|---|
| **Row 1 — Primitive** | **Pr** Prompts | **Em** Embeddings | **Ch** Prompt Chaining | **Sc** Schemas & Constraints | **Lg** LLMs |
| **Row 2 — Composition** | **Fc** Function Calling | **Vx** Vector Databases | **Rg** RAG | **Gr** Guardrails | **Mm** Multimodal Models |
| **Row 3 — Deployment** | **Ag** Agents | **Ft** Fine-tuning | **Fw** Frameworks | **Rt** Red Teaming | **Sm** Small Models |
| **Row 4 — Emerging** | **Ma** Multi-agent Systems | **Sy** Synthetic Data | **MCP** MCP Servers & Protocols | **In** Interpretability | **Th** Thinking Models |

**Filled blocks in this version:**  
- **Ch (Prompt Chaining)** — multi-step templates that reduce brittleness vs a single prompt  
- **Sc (Schemas & Constraints)** — structured outputs and validation for reliability  
- **MCP (MCP Servers & Protocols)** — a standard interface for tools and data sources

---

# Detailed Explanation (Element Catalog)

Each element includes: what it is, when to use it, typical risks, and practical notes.  
In real systems, elements are usually **combined** rather than used alone.

## Row 1 — Primitive

### Pr — Prompts
**What:** Natural language instructions that steer model behavior.  
**Use when:** You need a fast prototype or a controllable behavior layer.  
**Risks:** Prompt injection, brittle phrasing, hidden assumptions.  
**Practical notes:** Treat prompts as **versioned artifacts** with review + regression tests.

### Em — Embeddings
**What:** Vector representations capturing semantic similarity.  
**Use when:** You need search, clustering, deduplication, or retrieval.  
**Risks:** Domain mismatch, privacy leakage if embeddings are exposed.  
**Practical notes:** Choose embedding models that match your **language + domain**, and apply access control.

### Ch — Prompt Chaining (Templates)
**What:** Multi-step prompting (decompose → draft → critique → refine) and reusable templates.  
**Use when:** You want more reliable results than a single prompt.  
**Risks:** Latency, compounding errors, debugging complexity.  
**Practical notes:** Keep chains short, add checkpoints, and prefer **structured outputs** between steps.

### Sc — Schemas & Constraints
**What:** Enforcing output formats (e.g., JSON schema), allowed values, and validation checks.  
**Use when:** Downstream systems require reliable structure.  
**Risks:** Over-constraint can hurt answer quality; schema drift.  
**Practical notes:** Fail fast, return actionable validation errors, and log violations.

### Lg — LLMs
**What:** General-purpose language models for generation, reasoning, extraction.  
**Use when:** You need broad language capability.  
**Risks:** Hallucinations, bias, prompt sensitivity.  
**Practical notes:** For high-stakes use, pair with **retrieval**, **constraints**, and **evaluation**.

---

## Row 2 — Composition

### Fc — Function Calling
**What:** A controlled interface for models/agents to request tool execution.  
**Use when:** You need real-time data, actions, or computation.  
**Risks:** Tool misuse, insecure parameter passing, infinite tool loops.  
**Practical notes:** Validate arguments, sandbox tools, rate-limit calls, and log everything.

### Vx — Vector Databases
**What:** Systems optimized to store/search embeddings at scale.  
**Use when:** You need fast semantic retrieval over large corpora.  
**Risks:** Stale indexes, poor chunking, access control mistakes.  
**Practical notes:** Use document-level ACLs, monitor retrieval hit-rate and relevance.

### Rg — RAG (Retrieval-Augmented Generation)
**What:** Retrieve relevant context, then generate grounded outputs.  
**Use when:** Knowledge changes often, or you need citations/traceability.  
**Risks:** Wrong retrieval → confident wrong answers; leakage of sensitive docs.  
**Practical notes:** Evaluate retrieval separately (recall/precision) and generation (faithfulness).

### Gr — Guardrails
**What:** Runtime policies and safety controls (filters, PII redaction, topic restrictions, refusal rules).  
**Use when:** You must enforce security, privacy, or compliance.  
**Risks:** Over-blocking harms UX; under-blocking increases risk.  
**Practical notes:** Combine with RBAC + audit logs; keep policy rules testable.

### Mm — Multimodal Models
**What:** Models that understand/generate across text + images/audio/video.  
**Use when:** Your task needs visual or audio context (docs, screenshots, videos).  
**Risks:** Sensitive content in media; higher cost/latency.  
**Practical notes:** Add modality-specific preprocessing and redaction.

---

## Row 3 — Deployment

### Ag — Agents
**What:** Systems that plan, act via tools, and observe outcomes in a loop.  
**Use when:** Tasks require multi-step operations with external systems.  
**Risks:** Goal drift, infinite loops, unintended actions.  
**Practical notes:** Add budgets, step limits, approval gates, and strong logging.

### Ft — Fine-tuning
**What:** Adapting a base model using supervised or preference optimization.  
**Use when:** You need stable domain behavior, style, or specialized skill.  
**Risks:** Data leakage, governance complexity, catastrophic forgetting.  
**Practical notes:** Prefer adapters (e.g., LoRA), curate data, keep it auditable.

### Fw — Frameworks
**What:** Libraries to build chains/graphs/agents/integrations (e.g., orchestration frameworks).  
**Use when:** You want faster assembly and reusable patterns.  
**Risks:** Abstraction leaks, debugging complexity, lock-in.  
**Practical notes:** Keep core logic portable; test boundaries where tools connect.

### Rt — Red Teaming
**What:** Adversarial testing (jailbreaks, prompt injection, data exfiltration simulation).  
**Use when:** You deploy to untrusted users or handle sensitive data.  
**Risks:** False confidence if test set is narrow.  
**Practical notes:** Maintain an attack library and rerun after every major change.

### Sm — Small Models
**What:** Distilled/specialized models optimized for cost and latency.  
**Use when:** Edge/on-device or high-throughput settings.  
**Risks:** Capability gaps; may require better retrieval.  
**Practical notes:** Use a cascade: small model first, escalate to larger models if needed.

---

## Row 4 — Emerging

### Ma — Multi-agent Systems
**What:** Multiple agents with roles (planner, executor, critic) collaborating.  
**Use when:** Decomposition + cross-checking improves outcomes.  
**Risks:** Coordination overhead; conflicting goals.  
**Practical notes:** Define roles clearly and enforce shared-memory boundaries.

### Sy — Synthetic Data
**What:** Generated data to expand training/eval coverage.  
**Use when:** Real data is scarce, expensive, or privacy-restricted.  
**Risks:** Distribution shift, bias reinforcement.  
**Practical notes:** Validate with human review and real-world holdout benchmarks.

### MCP — MCP Servers & Protocols
**What:** Model Context Protocol (MCP) servers expose tools and data sources through a standard interface.  
**Use when:** You want one integration pattern across many tools (files, databases, SaaS APIs).  
**Risks:** Over-permissioned tool access; missing audit trails.  
**Practical notes:** Treat MCP servers like production services: auth, RBAC, logging, rate limits.

### In — Interpretability
**What:** Techniques to understand and explain model decisions.  
**Use when:** Safety, debugging, or compliance needs transparency.  
**Risks:** Explanations can mislead if not validated.  
**Practical notes:** Combine with counterfactual tests and targeted probes.

### Th — Thinking Models
**What:** Models that allocate extra compute to reasoning (deliberation) to improve correctness.  
**Use when:** Tasks are complex and errors are costly.  
**Risks:** Higher latency and cost.  
**Practical notes:** Use selective routing: invoke Th only when confidence is low.

---

# 10 Canonical Reactions (Reference Architectures)

A **canonical reaction** is a reusable architecture pattern written as a formula.  
Each pattern below includes **MCP servers** as a standard interface for tools and data sources.

---

## Reaction 1 — Secure Documentation Chatbot (Production RAG)
**Formula:** `Pr + Em + Vx + Rg + Sc + Gr + MCP + Lg (+ Rt)`

**Use case:** Answer questions using internal documentation with citations and access control.

**Typical MCP servers:**
- Confluence/SharePoint MCP (read-only doc fetch)
- Jira MCP (tickets, runbooks, incidents)
- File storage MCP (PDFs, SOPs, policies)

**Reference flow:**
1. Ingest docs → chunk → compute embeddings (**Em**) → store in **Vx** with document-level ACLs  
2. Query: validate user permissions; build structured requests (**Pr + Sc**)  
3. Retrieve top-k chunks (**Rg**) with citations + metadata  
4. Generate grounded answer (**Lg**) with structured response (answer + citations + confidence)  
5. Apply **Gr** (PII/secret redaction, refusal rules)  
6. Log everything for audit; run **Rt** regularly (injection + exfil tests)

**Where it breaks:** wrong retrieval causes confident wrong answers  
**Scale note:** evaluate retrieval and generation separately; monitor hit-rate and faithfulness

---

## Reaction 2 — Agentic Travel Booking (Think–Act–Observe)
**Formula:** `Pr + Fc + Ag + Fw + MCP + Sc + Gr + Lg (+ Th)`

**Use case:** Book a flight under constraints (budget, dates) with approvals and safe tool execution.

**Typical MCP servers:**
- Flights API MCP (search/pricing)
- Calendar MCP (availability)
- Email/Messaging MCP (send itinerary, approvals)
- Payments MCP (optional, behind explicit user approval gate)

**Reference flow:**
1. Restate constraints and ask clarifying questions (templates via **Pr**)  
2. Plan steps (**Ag**) and call tools via **Fc** through **MCP**  
3. Iterate: observe results, compare options; maintain structured state (**Sc**)  
4. Request explicit confirmation before booking  
5. Execute booking via MCP and send confirmation via email MCP  
6. Apply **Gr**: spending limits, safe actions, redact sensitive info

**Where it breaks:** loops / goal drift / unsafe actions without gating  
**Scale note:** budgets, step limits, timeouts, and approvals are non-negotiable

---

## Reaction 3 — SQL Analytics Copilot over a Data Warehouse
**Formula:** `Pr + Em + Vx + Rg + Fc + MCP + Sc + Gr + Lg`

**Use case:** Generate safe SQL, run it, and summarize results with definitions + caveats.

**Typical MCP servers:**
- Warehouse MCP (Postgres/Snowflake/BigQuery/etc.)
- Data catalog MCP (schemas, KPI glossary)
- BI tool MCP (optional: publish charts)

**Reference flow:**
1. Retrieve schema + KPI definitions via **Rg**  
2. Draft SQL with **Sc** constraints (read-only, row limits, no PII)  
3. Execute SQL via **Fc** through warehouse MCP; fetch results  
4. Summarize insights + assumptions; include SQL + preview  
5. Apply **Gr**: privacy rules, safe-query enforcement

**Where it breaks:** wrong joins, misleading causal language  
**Scale note:** add query linting, semantic layer, and golden-test questions

---

## Reaction 4 — Codebase Assistant with GitHub (PR-aware)
**Formula:** `Pr + Em + Vx + Rg + Fc + Ag + MCP + Sc + Gr (+ Ft)`

**Use case:** Understand a repo, propose changes, run tests, open PRs safely.

**Typical MCP servers:**
- GitHub MCP (read/write repo, issues, PRs)
- CI logs MCP (build/test logs)
- Security scanner MCP (optional)

**Reference flow:**
1. Index repo docs/code into **Vx**  
2. Retrieve context via **Rg**  
3. Produce change plan with **Sc** (files, edits, tests)  
4. Apply edits via MCP; run CI via MCP; summarize results  
5. Open PR with checklist; enforce **Gr** (no secrets, safe actions)

**Where it breaks:** prompt injection hidden in README/issues; unsafe tool actions  
**Scale note:** isolate tool instructions; enforce allowlists; scan diffs for secrets

---

## Reaction 5 — Multimodal Image Generation Studio (Text-to-Image)
**Formula:** `Pr + Ch + Sc + Gr + Mm (+ Sm)`

**Use case:** Generate/edit images from text while enforcing policy and consistent style.

**Typical MCP servers:**
- Asset library MCP (brand assets, templates)
- Storage MCP (save versions, metadata)

**Reference flow:**
1. Apply templates (**Ch**) for style + constraints  
2. Validate policy (**Gr**) and structure (**Sc**)  
3. Generate with **Mm**; optionally **Sm** for fast previews  
4. Store versions via MCP; export packages

**Where it breaks:** unsafe prompt requests; reproducibility issues  
**Scale note:** version prompts, seeds, and model versions

---

## Reaction 6 — Document Understanding & Extraction (Invoices, Forms)
**Formula:** `Pr + Mm + Sc + Fc + MCP + Gr + Lg`

**Use case:** Extract structured fields from PDFs/images and write to downstream systems.

**Typical MCP servers:**
- Document store MCP (Drive/S3/Blob)
- ERP/CRM MCP (SAP/Dynamics/etc.)
- Validation rules MCP (schemas, business checks)

**Reference flow:**
1. Fetch doc via MCP; parse with **Mm**  
2. Extract fields with strict **Sc** schema (with confidence)  
3. Validate business rules; route to human review if low confidence  
4. Write results via **Fc** through MCP  
5. Apply **Gr** for PII handling and safe logging

**Where it breaks:** adversarial PDFs, schema drift, low-confidence fields  
**Scale note:** keep labeled eval set per template + language

---

## Reaction 7 — Customer Support Autopilot (Triage + Draft + CRM Update)
**Formula:** `Pr + Em + Vx + Rg + Fc + Ag + MCP + Sc + Gr + Lg`

**Use case:** Classify tickets, retrieve knowledge, draft responses, update CRM safely.

**Typical MCP servers:**
- Ticketing MCP (Zendesk/Freshdesk)
- CRM MCP (Salesforce/HubSpot)
- Knowledge base MCP (Confluence/SharePoint)
- Messaging MCP (Slack/Teams) for escalation

**Reference flow:**
1. Ingest knowledge base into **Vx**  
2. Classify and retrieve context via **Rg**  
3. Draft response with **Sc** (tone, required fields, disclaimers)  
4. Execute allowed CRM updates via MCP after policy checks  
5. Escalate edge cases via messaging MCP and learn from feedback

**Where it breaks:** policy violations and hallucinated promises  
**Scale note:** approvals-first rollout; strict allowed-action playbook

---

## Reaction 8 — Security Operations Copilot (Alert Investigation)
**Formula:** `Pr + Rg + Vx + Fc + Ag + MCP + Gr + Rt + Th`

**Use case:** Investigate alerts, gather evidence, produce incident summary.

**Typical MCP servers:**
- SIEM MCP (Splunk/Sentinel)
- EDR MCP (Defender/CrowdStrike)
- Threat intel MCP (feeds/IOCs)
- Case management MCP (ServiceNow)

**Reference flow:**
1. Retrieve runbooks and similar incidents via **Rg**  
2. Agent queries SIEM/EDR via MCP and builds a structured case file (**Sc**)  
3. Use **Th** selectively for complex correlation  
4. Draft timeline + recommendations; update case via MCP  
5. Apply **Gr**: no destructive actions without approval; data minimization  
6. Continuous **Rt** for injection attempts through logs/runbooks

**Where it breaks:** attacker-controlled text attempting prompt injection  
**Scale note:** read-only by default; strict tool permissions; audit everything

---

## Reaction 9 — Multi-agent Research & Writing System
**Formula:** `Pr + Ma + Ag + Fc + Fw + MCP + Rg + Gr + Th`

**Use case:** Agents gather sources, synthesize, and write a report with traceable citations.

**Typical MCP servers:**
- Reference manager MCP (Zotero/Mendeley)
- Internal docs MCP (policies, prior reports)
- Project tracker MCP (Jira) for tasks/deadlines

**Reference flow:**
1. Planner agent decomposes work and assigns roles (**Ma**)  
2. Research agent retrieves sources via MCP and summarizes grounded via **Rg**  
3. Critic agent checks claims and consistency  
4. Writer agent outputs structured report (**Sc**)  
5. **Gr:** no fabricated citations; explicit uncertainty; traceable sources  
6. Use **Th** only where necessary to manage cost

**Where it breaks:** citation fabrication, inconsistent claims across agents  
**Scale note:** enforce “every claim must map to retrieved evidence” rules

---

## Reaction 10 — On-device Assistant with Local RAG Sync
**Formula:** `Sm + Em + Vx + Rg + MCP + Sc + Gr (+ Ft)`

**Use case:** Low-latency assistant on-device with local retrieval + optional cloud sync.

**Typical MCP servers:**
- Local files MCP (device file system)
- Calendar/tasks MCP (OS integrations)
- Optional cloud sync MCP (enterprise knowledge snapshot)

**Reference flow:**
1. Build local embedding index (**Em**) in small **Vx**  
2. Answer via **Rg**; keep responses structured (**Sc**)  
3. Use MCP tools to read/update notes and calendar (confirmations required)  
4. Apply **Gr**: privacy-by-default; no cloud sending unless opt-in  
5. Optional **Ft** for personalization (with auditable data)

**Where it breaks:** limited capability vs larger models  
**Scale note:** cascade routing—use Sm first, escalate only with explicit permission

---

# Practical Tips (What I’ve Found Works in Real Builds)

- **Start from the reaction you need, not the component you like.** Product goal determines the formula.  
- **Evaluate retrieval and generation separately.** Many failures come from wrong context, not model capability.  
- **Treat tool access like production security.** MCP servers should have auth, RBAC, logging, and rate limits.  
- **Guardrails are not one filter.** Combine **Sc** (constraints), **Gr** (policies), and **Rt** (adversarial testing).  
- **Use small models where possible.** Route to larger/thinking models only when needed.  
- **Version everything.** Prompts, schemas, indexes, model versions, and policy rules.

---

## References
- Martin Keen (IBM), “What if AI had its own periodic table?” (YouTube): https://www.youtube.com/watch?v=ESBMgZHzfG0

---

### Want to collaborate?
If you’re building GenAI systems (RAG, agents, multimodal, or evaluation tooling), feel free to reach out:
[LinkedIn](https://www.linkedin.com/in/bhardwaj-suraj/) • [GitHub](https://github.com/SurajBhar) • [Website](https://surajbhar.github.io/)
