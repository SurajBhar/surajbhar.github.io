---
layout: page
title: Predicting Movie Sentiment End-to-End- From Code to Cloud
description: Movie Sentiment Prediction Microservice
img: assets/img/p_moviesentiment/3_app_1.png
importance: 1
category: work
related_publications: false
---

In an era when audiences encounter thousands of film reviews every day, turning unstructured text into clear, actionable insights is a crucial skill. I designed and built a completely automated Movie Sentiment Prediction pipeline that applies modern data-science best practices and cloud-native deployments to transform raw reviews into sentiment scores—served through a high-performance, production-grade API. Below, I describe my motivations, architecture, key components, and lessons learned during development.

[ View the source on GitHub](https://github.com/SurajBhar/moviesentiment/)

---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p_moviesentiment/3_app_1.png" title="Positive Movie Review Sentiment Prediction" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p_moviesentiment/4_app_4.png" title="Negative Movie Review Sentiment Prediction" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p_moviesentiment/6_EKS_app.png" title="EKS-cluster deployed flask app microservice" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Movie Sentiment Prediction Microservice. On the left, locally deployed flask app to predict the movie review sentiment with positive sentiment UI. Middle, locally deployed flask app to predict the movie review sentiment with negative sentiment UI. Right, EKS-cluster deployed flask app microservice ready for inference.
</div>

---

## The Challenge: Unstructured Data Meets Production Demands

Movie reviews—from blogs, social media, and aggregators—are a gold mine of audience sentiment, but only if you can process them reliably at scale. Ad-hoc scripts and notebooks work for prototypes, but they break down when you need:

1. **Reproducibility** across environments.
2. **Traceability** of data, code, and experiments.
3. **Continuous deployment** with zero-downtime updates.
4. **Real-time monitoring** of performance and health.

My goal was to automate the entire machine-learning lifecycle—data ingestion through model serving—while ensuring every result can be audited, reproduced, and deployed with confidence.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p_moviesentiment/Architecture.png" title="Architecture of Microservice" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Architecture of the microservice. This picture shows the project workflow starting from local machine learning based experimentation at the top to eks-cluster deployment, monitoring and dashboarding at the bottom.
</div>

---

## Building on a Solid Foundation

I started with DrivenData’s Cookiecutter Data Science template to enforce a consistent project layout (`src/`, `data/`, `notebooks/`, `tests/`, configs). Conda managed a Python 3.10 environment so all dependencies stayed in sync. Core modules in `src/` break down each pipeline stage:

* **Data Ingestion** retrieves raw review text from CSV or API sources.
* **Preprocessing** cleans URLs, emojis, and stop words; normalizes punctuation.
* **Feature Engineering** tokenizes text, applies TF-IDF and Bag-of-Words, and computes lexicon scores.
* **Model Building** trains classifiers (Logistic Regression, Random Forest, XGBoost) with MLflow tracking.
* **Evaluation & Registration** compares metrics, selects the best model, and registers it in the MLflow model registry.

I defined every hyperparameter in `params.yaml` and orchestrated the workflow with `dvc.yaml`, guaranteeing consistent, reproducible runs.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p_moviesentiment/data_pipeline.png" title="Datapipeline" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    DVC Datapipeline.
</div>

## Quick Setup & Installation
{% raw %}

```bash

#1. Clone the repository
git clone https://github.com/SurajBhar/moviesentiment.git
cd moviesentiment

# 2. Create & activate Conda environment
conda create -n senti python=3.10
conda activate senti

# 3. Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# 4. Run full DVC pipeline
dvc repro

# 5. Run Uni test on Model
python -m unittest tests/test_model.py

# 6. Promote model to Production
python scripts/promote_model.py --ci-cd

# 7. Run Flask app tests & Run flask app locally
python -m unittest tests/test_flask_app.py
python flask_app/app.py

# 6. Add Secrets to your Github actions secrets & variables
# Copy the secrets from the .env file (Add Your AWS credentials)

# 7. Setup your AWS account for deployment

# 8. Follow the ci.yaml file for deployment
   - Login to AWS ECR 
   - Build Docker image 
   - Tag Docker image 
   - Push Docker image to ECR
   - Create Kubernetes Secret 
   - Deploy to EKS

# 9. After deployment access the app at the 5000 port with External IP
- You can get your external ip using following command
- kubectl get svc <flask-app-service-name>
# An example: <Your External IP>:5000
ae3f90f44000345e380021fff385e80f-1100359576.us-east-1.elb.amazonaws.com:5000

```

{% endraw %}

---

## Experiment Tracking with DagsHub & MLflow

To eliminate “it works on my machine” issues, I integrated MLflow with DagsHub’s hosted server. Every run—complete with hyperparameters, metrics, and artifacts—was automatically logged. DVC versioned the data and intermediate artifacts in a remote storage (initially local, then AWS S3), so I could branch or roll back experiments with a single command.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p_moviesentiment/7_mlflow_production.png" title="Model versioning, Model Registry and Model Serving" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    MLFlow for model versioning, model registry and model serving.
</div>

---

## From Flask to Docker: Wrapping the Model in an API

Once the model was registered, I built a Flask microservice exposing a `/predict` endpoint. Incoming JSON payloads containing review text are vectorized and scored in milliseconds. I used `python-dotenv` to manage secrets (DagsHub token, AWS credentials) outside of source control. Local testing with:

```bash
export FLASK_APP=flask_app/app.py
flask run --port=5000

# Or run with python
python flask_app/app.py
```

confirmed that containerization would be seamless.

Packaging the service in Docker took just a few commands:

```bash
pipreqs flask_app --force
docker build -t moviesentiment-app:latest .
docker run -p 8888:5000 \
  -e DGSHUB_TOKEN="<TOKEN>" \
  moviesentiment-app:latest
```

The image then passed CI checks and was pushed to AWS ECR via GitHub Actions.

---

## Scaling on Kubernetes with EKS

For resilience and auto-scaling, I deployed on Amazon EKS:

```bash
eksctl create cluster \
  --name moviesentiment-cluster \
  --region us-east-1 \
  --node-type t3.small \
  --nodes 1 --nodes-min 1 --nodes-max 2
```

My CI pipeline applied the Kubernetes manifests (`deployment.yaml`), launching two replicas behind an AWS Load Balancer. Within minutes, the service was live at a stable external IP.

---

## Observability with Prometheus & Grafana

No production system is complete without monitoring. I provisioned two EC2 instances:

* **Prometheus** scrapes custom metrics (request count, latency, error rates) from the Flask app every 15 seconds.
* **Grafana** connects to Prometheus, displaying real-time dashboards and alerting on anomalies.

This setup provides immediate visibility into performance regressions and infrastructure health.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p_moviesentiment/0_prometheous.png" title="Observability with Prometheus" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Observability with Prometheus.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p_moviesentiment/1_grafana.png" title="Dashboarding with Grafana" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Dashboarding with Grafana.
</div>

---

## Lessons & Best Practices

1. **Modular Design**
   Breaking each step into its own module simplifies testing and maintenance.
2. **Complete Versioning**
   Pin environments (Conda), code (Git), data (DVC), and experiments (MLflow) to eliminate hidden drift.
3. **Automate Early**
   Automating environment setup, data pipelines, and CI/CD frees me to focus on innovation.
4. **Infrastructure as Code**
   Tools like `eksctl` and Kubernetes manifests turn cloud configurations into repeatable blueprints.
5. **Built-in Observability**
   Integrating monitoring from day one avoids firefighting surprises after deployment.

---

## Conclusion

This Movie Sentiment Prediction project demonstrates how to build a fully reproducible, scalable machine-learning service—from raw data to cloud-native API—using industry-leading open-source tools. The end-to-end pipeline accelerates development cycles and guarantees the reliability and maintainability required for real-world production systems. As ML workloads grow more complex, such disciplined, automated practices will continue to be essential.