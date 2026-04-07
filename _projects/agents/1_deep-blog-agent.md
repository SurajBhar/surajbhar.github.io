---
layout: page
title: Technical Content Writer Agentic Platform
description: Agentic AI system for automated technical blog generation using LangGraph, Streamlit, and LLMs.
img: assets/img/p_tcw/0_home_page.png
importance: 1
category: generative-ai
related_publications: false
---

**Deep Blog Agent** (Technical Content Writer Agent) is a **Streamlit + LangGraph based agentic AI system** designed to generate high-quality technical blog posts from a short prompt or topic. It combines **structured planning, web research, long-form content synthesis, and optional image generation** into a single reproducible workflow.

👉 [Live Demo (Streamlit)](https://surajbhartcwagent.streamlit.app/)  | 👉 [GitHub Repository](https://github.com/SurajBhar/deep-blog-agent)   | 👉 [YouTube Demo](https://youtu.be/zuAzi6HcQLk)

---

## Overview

This project solves a common problem in technical writing:

> How to quickly generate a **structured, research-backed draft** while maintaining transparency and reproducibility.

The system provides:

- A **Streamlit workspace** with live workflow visibility
- A **LangGraph-based multi-stage pipeline**
- Optional **web research using Tavily**
- Optional **image generation for diagrams**
- Persistent **artifact storage for reproducibility**

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="/assets/img/p_tcw/0_home_page.png" title="Technical Content Writer Agentic Platform" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Homepage of Technical Content Writer Agentic Platform
</div>

---

## System Workflow

Each run follows a structured pipeline:

1. Accept a topic or prompt  
2. Decide whether research is needed  
3. Retrieve and process evidence  
4. Generate structured outline  
5. Draft sections in parallel  
6. Assemble final markdown  
7. Optionally generate and embed images  
8. Save outputs as reusable artifacts  

---

## Architecture (Agentic Pipeline)

The system is implemented using **LangGraph**, enabling modular and observable workflows.

Router → Research → Orchestrator → Workers → Reducer

- Router: decides research vs closed-book mode  
- Research Node: retrieves external knowledge (Tavily)  
- Orchestrator: builds structured plan (Pydantic schema)  
- Workers: generate sections in parallel  
- Reducer: combines outputs into final blog  

---

## Key Features

### Agentic Blog Generation

- Multi-stage structured reasoning pipeline
- Evidence-grounded content generation
- Modular section-wise drafting
- Deterministic output formats

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p_tcw/6_sample_blog_run_detail.png" title="Sample Blog Generation" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p_tcw/10_home_sources.png" title="Citations" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Example of a technical blog generated using this agentic platform.
</div>

### Research Integration

- Tavily-powered web search
- Citation-aware generation
- Up-to-date knowledge incorporation

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p_tcw/13_home_blog_references.png" title="Technical Content Writer Agentic Platform" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Citation-aware generation
</div>

### UI & Observability

- Live workflow execution tracking
- Run history and replay
- Detailed run inspection (logs, sources, outputs)
- Transparent agent reasoning

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p_tcw/12_home_trace.png" title="Technical Content Writer Agentic Platform" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Detailed run inspection (logs, sources, outputs)
</div>

### Artifact System

Each run generates reusable outputs:

```bash
outputs/<timestamp>_<slug>/
  ├── blog.md
  ├── run.json
  └── images/
```

- Markdown export
- Metadata tracking
- Image bundling
- Reproducibility support

### FinOps & Cost Awareness

- Token usage tracking
- Cost estimation per run
- Configurable pricing assumptions

---

## Observability & Monitoring

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p_tcw/14_Observability.png" title="Observability using LangSmith" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p_tcw/14_1_Observability.png" title="Observability using LangSmith" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Observability using LangSmith
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p_tcw/15_Monitoring.png" title="Monitoring using LangSmith" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p_tcw/15_1_Monitoring.png" title="Monitoring using LangSmith" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Monitoring using LangSmith
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p_tcw/15_2_Monitoring.png" title="Monitoring using LangSmith" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p_tcw/16_Tool_Monitoring.png" title="Monitoring using LangSmith" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Monitoring using LangSmith
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p_tcw/17_Monitoring_Run_Types_Latency.png" title="Monitoring of Technical Content Writer Agentic Platform" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Monitoring: Run Count, Median Latency & Error Rate
</div>

---

## Streamlit Interface

The UI is structured into multiple functional pages:

- Home → Prompt input + live workflow  
- Prompt Examples → reusable prompts  
- Run History → previous sessions  
- Run Detail → full trace + outputs  
- Settings → API keys + model config  
- FinOps → cost tracking
  
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p_tcw/4_run_detail.png" title="Run Details Technical Content Writer Agentic Platform" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Run Details Technical Content Writer Agentic Platform
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p_tcw/5_run_detail.png" title="Run Details Technical Content Writer Agentic Platform" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Run Details Technical Content Writer Agentic Platform
</div>

---

## Tech Stack

- Backend / Agents: LangGraph, LangChain  
- LLMs: OpenAI (text), Google GenAI (images)  
- Research: Tavily API  
- Frontend: Streamlit  
- Data Models: Pydantic  
- Environment: Python 3.13, uv  

---

## CLI Usage

Supports both UI and CLI workflows:

deep-blog-agent "Write a technical blog on RAG evaluation in production"

Optional flags:

- --no-research
- --no-images
- --print-markdown

---

## Implementation Highlights

- LangGraph-based modular orchestration
- Parallel section generation
- Schema-driven planning with Pydantic
- Separation of concerns (providers, core, agents, UI)
- Reproducible artifact pipeline
- Session-based API key handling in UI

---

## What I Learned

- Designing agentic workflows with structured reasoning
- Building observable AI systems (LangSmith + logs + UI tracing)
- Integrating retrieval + generation + planning pipelines
- Managing cost-aware GenAI systems (FinOps layer)
- Creating production-ready ML/LLM applications with UI + CLI

---

## Links

- [GitHub](https://github.com/SurajBhar/deep-blog-agent)  
- [Live Demo](https://surajbhartcwagent.streamlit.app/)  
- [Demo Video](https://youtu.be/zuAzi6HcQLk)

---
