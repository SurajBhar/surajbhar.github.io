---
layout: page
title: GDPR RAG Assistant
description: Evaluation-first GDPR Retrieval-Augmented Generation (RAG) assistant with FastAPI, Azure OpenAI, Azure AI Search, and automated RAG evaluation.
img: assets/img/p_gdpr_rag/eval2.png
importance: 2
category: generative-ai
related_publications: false
---

The **GDPR RAG Assistant** is a production-style, **evaluation-first Retrieval-Augmented Generation (RAG)** chatbot that answers questions about the **EU GDPR** using a vectorized corpus of **Articles and Recitals**.

The system is designed to:

- Return **grounded answers with citations** to specific GDPR Articles/Recitals  
- **Gracefully fall back** when the dataset doesn’t contain the answer  
- Handle **off-topic questions neutrally** (no fake citations)  
- Be **fully evaluated** (retriever + generator + routing) using **offline metrics** and **online LLM-as-a-judge pipelines**

**Tech highlights:**

- **Backend:** FastAPI · Python 3.10+ · Azure OpenAI (GPT-4o) · Azure AI Search  
- **RAG Core:** Three-tier routing logic (Grounded → Hybrid → Off-topic)  
- **Frontend:** Lightweight SPA (HTML/CSS/JS) with citations and a **3D retrieval viz** (Plotly)  
- **Deploy:** Docker · GitHub Container Registry (GHCR) · Azure Container Apps · GitHub Actions CI/CD  
- **Evaluation:** Custom offline evaluation harness + **Giskard** + **RAGAS** for online RAG evaluation  

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p_gdpr_rag/GDPR_Chatbot.png" title="GDPR RAG Assistant – Chat UI" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    GDPR RAG Assistant – Chat UI with GDPR citations and dataset panel.
</div>

---

## 1. Problem Statement

**Goal:** Build a GDPR assistant that:

- Answers questions using **actual GDPR law text** (Articles + Recitals),  
- Is **honest** about missing coverage,  
- Is guarded against **hallucinations and off-topic answers**, and  
- Can be **measured and improved** using a proper evaluation pipeline.

Most GDPR “chatbots” simply send the question to an LLM.  
This project explores how to build a **domain-specific, evaluation-driven RAG system** that could realistically support **privacy officers, lawyers, and compliance teams**.

---

## 2. Demo

A short walkthrough of the deployed MVP is available on YouTube:

- 🎥 **Demo video:** [GDPR RAG Assistant – Azure Container Apps Deployment](https://www.youtube.com/watch?v=jpLyntoomu4)

The demo shows:

- How questions are routed through the three-tier RAG logic  
- How citations to GDPR Articles/Recitals are displayed  
- The 3D visualization of retrieved chunks for the last question  

---

## 3. Architecture & Tech Stack

**Core components:**

- **Backend:**  
  - `FastAPI` for the API and static file serving  
  - `Azure OpenAI` (GPT-4o) for generation and embeddings  
  - `Azure AI Search` as the vector search backend for GDPR chunks  

- **RAG Core (app/rag.py):**  
  - Intent classification / routing  
  - Retrieval using Azure AI Search  
  - Branching into grounded, hybrid, or off-topic answers  
  - Answer formatting with structured `Source` objects (article id, title, snippet, score)

- **Frontend (web/):**  
  - Minimalist SPA (HTML + CSS + vanilla JS)  
  - Chat interface, copy-to-clipboard, “Jump to latest” helper  
  - Dataset & About panels  
  - 3D Plotly visualization of retrieved chunks on a **unit sphere** using `acos(similarity)` as angles  

- **Deployment:**  
  - Docker image for the FastAPI + static SPA  
  - Image published to **GitHub Container Registry (GHCR)**  
  - Hosted as an **Azure Container App** (2 vCPU / 4 GB recommended)  
  - Automated CI/CD pipeline via **GitHub Actions** (build → push → deploy)  

---

## 4. Three-Tier RAG Logic

The heart of the system is a **three-tier RAG flow**:

1. **Grounded Answer (GDPR Dataset)**  
   - Retrieve top-K chunks from Azure AI Search  
   - Answer **only using retrieved context**  
   - If the dataset doesn’t explicitly contain an answer, emit a **sentinel string** (“no answer from dataset”)  

2. **Hybrid GDPR Guidance**  
   - Triggered when retrieval is weak or the sentinel is emitted  
   - Clearly states that **no direct answer** was found in the dataset  
   - Provides a **concise expert-style explanation**, still labeled as guidance  

3. **Off-topic Neutral Answer**  
   - For non-GDPR questions  
   - Returns a **short, factual reply** with **no GDPR citations**  
   - Prevents the system from giving legal-looking answers on irrelevant topics  

**Entrypoints:**

- Backend: `app/main.py` → `/api/chat` → `rag_answer()`  
- RAG core: `app/rag.py` (classification → retrieval → branch → answer)  

---

## 5. GDPR Dataset

The assistant is powered by the **GDPR Articles & Recitals** dataset:

- Hugging Face: **`AndreaSimeri/GDPR`**  
- **99 Articles** across 11 chapters  
- **173 Recitals** providing interpretive context  

Example:  
Article **7(2)** (Conditions for consent) is interpreted with Recital **42** which clarifies:

- Proof of consent  
- Identity of the controller  
- Purpose of the processing  

The frontend’s **Dataset** panel links to:

- The Hugging Face dataset  
- The original paper:

> *Simeri, A. and Tagarelli, A. (2023). GDPR Article Retrieval based on Domain-adaptive and Task-adaptive Legal Pre-trained Language Models. LIRAI 2023 (CEUR Vol. 3594), pp. 63–76.*

---

## 6. Running the System

**Prerequisites:**

- Python **3.10+**  
- Azure subscription with:
  - **Azure OpenAI** (chat + embedding deployments)  
  - **Azure AI Search** (index loaded with GDPR chunks)  

### Configuration

Runtime configuration is centralized in `app/settings.py` and read from environment variables:

```text
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_KEY=
AZURE_OPENAI_API_VERSION=
AZURE_OPENAI_CHAT_DEPLOYMENT=
AZURE_OPENAI_EMBEDDING_DEPLOYMENT=
AZURE_SEARCH_ENDPOINT=
AZURE_SEARCH_API_KEY=
AZURE_SEARCH_INDEX_NAME=
```

Optional tuning knobs:

```text
TOP_K=4
TEMPERATURE=0.2
MAX_TOKENS=800
```

For local dev: create a `.env` file (loaded via `python-dotenv`).
In Azure Container Apps: set these as environment variables / secrets.

### Local Run

```bash
uvicorn app.main:app --reload --port 8000
# Visit: http://127.0.0.1:8000
```

The SPA is served from `web/index.html` via `/static`.

---

## 7. Deployment on Azure Container Apps

**Local Docker build & run:**

```bash
docker build -t gdpr-rag:latest .
docker run --rm -p 8000:8000 \
  --env-file .env \
  gdpr-rag:latest
```

**Push to GitHub Container Registry (GHCR):**

```bash
docker tag gdpr-rag:latest ghcr.io/<org-or-user>/gdpr-rag:latest
docker push ghcr.io/<org-or-user>/gdpr-rag:latest
```

**Create Azure Container App (high level):**

```bash
az containerapp env create -g <rg> -n <env-name> --location <region>

az containerapp create -g <rg> -n gdpr-rag \
  --image ghcr.io/<org-or-user>/gdpr-rag:latest \
  --environment <env-name> \
  --target-port 8000 --ingress external \
  --env-vars \
    AZURE_OPENAI_ENDPOINT=... \
    AZURE_OPENAI_KEY=secretref:AZURE_OPENAI_KEY \
    AZURE_OPENAI_API_VERSION=... \
    AZURE_OPENAI_CHAT_DEPLOYMENT=... \
    AZURE_OPENAI_EMBEDDING_DEPLOYMENT=... \
    AZURE_SEARCH_ENDPOINT=... \
    AZURE_SEARCH_API_KEY=secretref:AZURE_SEARCH_API_KEY \
    AZURE_SEARCH_INDEX_NAME=...
```

The repository includes guidance on:

* Creating a **GitHub PAT** for GHCR
* Creating an **Azure Service Principal** for CI/CD
* Resource sizing (2 vCPU / 4 GB RAM) and common deployment **gotchas**

---

## 8. API Design

**Primary endpoint:**

```http
POST /api/chat
```

**Sample request:**

```json
{
  "message": "Within how many hours must a controller notify a data breach?"
}
```

**Sample response:**

```json
{
  "answer": "The controller must notify ... not later than 72 hours ... (Article 33).",
  "sources": [
    {
      "article_id": "33",
      "article_title": "Notification of a personal data breach to the supervisory authority",
      "chunk_id": 12,
      "snippet": "…",
      "score": 0.78
    }
  ]
}
```

Pydantic models are defined in `app/schemas.py`:

* `ChatRequest { message: str }`
* `Source { article_id, article_title, chunk_id, snippet, score }`
* `ChatResponse { answer: str, sources: Source[] }`

---

## 9. Evaluation & Testing

This project is explicitly **evaluation-first**.
It includes both **offline** and **online** evaluation components.

### 9.1 Offline Evaluation (Custom Harness)

A Python evaluation pipeline generates an HTML report with retrieval & answering metrics.

**Key metrics (N = 50 GDPR Q/A pairs):**

* **Retrieval**

  * Recall@K ≈ **0.96**
  * MRR ≈ **0.93**
  * Mean top-1 similarity ≈ **0.75** (p50 ≈ 0.76, p90 ≈ 0.82)

* **Answering**

  * Exact Match (EM) = **0.0** (due to strict legal phrasing)
  * Token-level F1 ≈ **0.66**

* **Groundedness & Routing**

  * Groundedness (when grounded) ≈ **0.96**
  * Routing: 100% of this eval set passed through the **grounded** route

* **Latency**

  * Average end-to-end latency ≈ **2.19 s**
  * p95 latency ≈ **4.63 s** (Azure Container Apps)

Visuals include retrieval metrics, top-1 score distribution, F1 by route, and latency.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/p_gdpr_rag/retrieval_metrics.png" title="Retrieval metrics visualization" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Retrieval metrics visualization (offline evaluation).
</div>

---

### 9.2 Online Evaluation (Giskard + RAGAS)

To evaluate the **deployed** system, the project integrates:

* **Giskard LLM Evaluation** for:

  * Generator correctness
  * Retriever correctness
  * Rewriter & router behavior
  * Safety scans (harmfulness, prompt injection, stereotypes)

* **RAGAS metrics** (LLM-as-a-judge) for:

  * `answer_correctness`
  * `faithfulness` / groundedness
  * `context_precision`, `context_recall`, `context_relevancy`
  * `answer_relevancy`

This online evaluation:

* Confirms **good routing behavior** (on-topic vs off-topic)
* Surfaces **weak areas** (e.g. query rewriting, missing topic coverage such as DPIA & some data subject rights)
* Feeds directly into the **backlog**: better chunking, enriched KB, stronger safety prompts

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/p_gdpr_rag/eval.png" title="Online RAG evaluation with Giskard and RAGAS" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Online RAG evaluation – Giskard + RAGAS metrics dashboard.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/p_gdpr_rag/eval2.png" title="Knowledge Base Visualization and RAG evaluation with RAGAS" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Online RAG evaluation – RAGAS metrics + Knowledge Base Visualization dashboard.
</div>

---

## 10. Raised PR to Contribute to Giskard

During integration with **RAGAS 0.3.9**, two breaking issues appeared in Giskard’s RAG stack:

1. `RagasLLMWrapper` was missing an `is_finished()` implementation → abstract-class instantiation errors
2. Giskard still used the old `.score()` API, which was removed in RAGAS 0.3.9

**Fixes contributed:**

* Implemented `is_finished()` in `RagasLLMWrapper` to comply with `BaseRagasLLM`
* Updated Giskard’s RAGAS integration to use the new `SingleTurnSample` + `single_turn_score(...)` API
* Added a compatibility fallback for older RAGAS versions
* Submitted a reproducible test script + PR following contribution guidelines

As a result, **Giskard now works smoothly with RAGAS 0.3.9 and Azure OpenAI** in RAG evaluation pipelines like this one.

---

## 11. Roadmap

Some planned extensions include:

* `/healthz` and `/metrics` endpoints (Prometheus-friendly)
* Inline citations auto-tagging (e.g. `[Article X]` in the answer text)
* Hybrid retrieval (lexical + vector) on Azure AI Search
* More standardized evaluation scripts (`/scripts/eval.py`) with a reusable gold Q/A set

---

## 12. Resources

* 💻 **GitHub Repository:**
  [https://github.com/BharAI-Lab/rag_azure_fastapi](https://github.com/BharAI-Lab/rag_azure_fastapi)

* 📺 **Demo Video:**
  [https://www.youtube.com/watch?v=jpLyntoomu4](https://www.youtube.com/watch?v=jpLyntoomu4)

* 📄 **Offline Evaluation Report (HTML):**
  Generated under `docs/report.html` from the evaluation pipeline

---

## 13. Closing Thoughts

This project is less about “wrapping GPT in a chat UI” and more about:

* Treating **RAG as a measurable system** (retrieval, context use, generation, routing, safety),
* Designing for **transparent, citation-backed answers** in a legal domain,
* And using **evaluation as the main driver** for iteration.

The same architecture and evaluation approach can be adapted to:

* Financial regulations
* Clinical/pharma documentation
* Enterprise knowledge bases with strong compliance requirements

> **If it’s not evaluated, it’s just a demo.**
> The GDPR RAG Assistant is a concrete step towards **trustworthy, observable, and improvable** RAG systems.