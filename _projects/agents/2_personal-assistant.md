---
layout: page
title: Strands Multi-Agent Orchestrator
description: Multi-agent personal assistant using Strands agent-as-tool pattern with orchestration across calendar, coding, and search.
img: assets/img/p_personalassistant/multi-agent-architecture.png
importance: 2
category: generative-ai
related_publications: false
---

**Personal Assistant Agent** is a **multi-agent system built using the Strands agent-as-tool pattern**, where a central orchestrator intelligently routes user requests to specialized agents for calendar management, coding, and real-time web research.

👉 [GitHub Repository](https://github.com/SurajBhar/personal_assistant_agent)

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p_personalassistant/multi-agent-architecture.png" title="Personal Assistant Agent – Multi-Agent Orchestrator" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Personal Assistant Agent – Multi-Agent Orchestrator
</div>

---

## Overview

This project demonstrates how to build a **modular, extensible, and production-style multi-agent system** capable of handling complex, multi-domain user requests within a single interaction.

The system supports:

- Intelligent **task routing across multiple agents**
- Seamless handling of **multi-step, multi-domain workflows**
- Integration of **local tools, LLM reasoning, and external APIs**

---

## Architecture

The system follows an **agent-as-tool orchestration pattern**:

Orchestrator → (Calendar Agent | Code Agent | Search Agent)

- **Orchestrator**: Receives user prompts and decides which agent(s) to invoke  
- **Calendar Agent**: Handles scheduling and agenda management  
- **Code Agent**: Executes code, edits files, and runs shell commands  
- **Search Agent**: Performs real-time web research using Perplexity MCP  

This design enables **composability, scalability, and clear separation of concerns**.

---

## Key Features

### Multi-Agent Orchestration

- Dynamic routing of user queries
- Supports both single-agent and multi-agent workflows
- Handles chained tasks across domains

### Calendar Assistant

- Create, update, and list appointments
- Retrieve daily agenda
- SQLite-backed persistent storage

### Code Assistant

- Python REPL execution
- Multi-file editing support
- Shell command execution
- Developer journaling capabilities

### Search Assistant

- Real-time research using Perplexity MCP
- Source-aware responses
- Docker-based tool execution

---

## Example Capabilities

### Calendar Tasks

- Create an appointment with structured metadata
- Retrieve agenda for a specific date
- Update existing appointments

### Coding Tasks

- Generate Python scripts
- Execute code interactively
- Assist with development workflows

### Research Tasks

- Retrieve up-to-date information
- Provide sources for verification

### Multi-Domain Task

Example:

Schedule a meeting, generate a script, and perform research in a single request.

This demonstrates **true agent collaboration and orchestration**.

---

## Tech Stack

- **LLM / Orchestration**: AWS Bedrock (Claude), Strands Agents  
- **Search**: Perplexity MCP (Docker-based)  
- **Backend**: Python 3.13  
- **Database**: SQLite  
- **Environment**: uv  
- **Containerization**: Docker  

---

## Project Structure

personal_assistant.py                # Main orchestrator
agents/
  calendar_assistant.py              # Calendar agent
  code_assistant.py                  # Coding agent
  search_assistant.py                # Search agent (MCP + Docker)
calendar_tools/
  create_appointment.py
  list_appointments.py
  update_appointment.py
  get_agenda.py
config/
  env_setup.py
  constants.py
appointments.db

---

## How It Works

1. User submits a request  
2. Orchestrator analyzes intent  
3. Relevant agent(s) are selected  
4. Agents execute tasks independently  
5. Results are aggregated and returned  

This creates a **flexible and extensible agent ecosystem**.

---

## Setup

```bash
uv venv
uv sync
```

Run orchestrator:

```bash
uv run python -u personal_assistant.py
```

---

## Implementation Highlights

- Agent-as-tool architecture for modular design
- Multi-agent orchestration with dynamic routing
- Integration of local tools, LLMs, and external APIs
- Docker-based MCP integration for search
- Persistent storage for real-world usability

---

## What I Learned

- Designing scalable multi-agent systems
- Orchestrating heterogeneous tools under a unified interface
- Integrating LLM reasoning with external execution environments
- Handling multi-step workflows across domains
- Building production-style agent architectures

