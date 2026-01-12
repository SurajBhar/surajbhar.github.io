---
layout: page
title: Codeninja-Local Code Assistant
description: Local AI-powered coding assistant with Gradio and Ollama
img: assets/img/p_rag/codeninja_demo.png
importance: 2
category: generative-ai
related_publications: false
---

**Codeninja** is a lightweight, local **AI-powered coding assistant** built using a custom model (`codeninja`) hosted with **Ollama** and accessed through a **Gradio interface**. It provides contextual coding suggestions, keeps a history of prompts, and runs entirely offline — ensuring privacy and fast inference.

---

## 1. Defining the Custom Model (Modelfile)

We start by defining a **custom model** in Ollama. This uses `codellama` as the base model, sets a temperature, and adds a **system prompt** to specialize the assistant:

```dockerfile
FROM codellama

# Set the temperature
PARAMETER temperature 1

# Set the system prompt
SYSTEM """
You are a code assistant named CodeNinja created by Suraj Bhardwaj.
Answer all the queries related to code being asked.
"""
```

_This customization transforms `codellama` into “Codeninja”, a coding-focused assistant with its own identity._

---

## 2. Backend API

The Ollama model runs locally and exposes a REST API at `http://localhost:11434/api/generate`.
We define a Python client that interacts with this API.

```python
import requests, json

url = "http://localhost:11434/api/generate"
headers = { 'Content-Type':'application/json' }
history = []
```

---

## 3. Generating Responses

The assistant maintains a **history of prompts** for multi-turn context. Each new query is appended and sent as part of the final prompt.

```python
def generate_response(prompt):
    history.append(prompt)
    final_prompt = "\n".join(history)

    data = {
        "model": "codeninja",
        "prompt": final_prompt,
        "stream": False
    }

    response = requests.post(url, headers=headers, data=json.dumps(data))

    if response.status_code == 200:
        data = json.loads(response.text)
        return data['response']
    else:
        print("error:", response.text)
```

_Appending history allows the chatbot to maintain conversational memory across multiple turns._

---

## 4. Gradio User Interface

We wrap the backend logic into a **Gradio interface** for an easy-to-use web app.

```python
import gradio as gr

interface = gr.Interface(
    fn=generate_response,
    inputs=gr.Textbox(lines=4, placeholder="Enter your Prompt"),
    outputs="text"
)

interface.launch()
```

_Users can simply type a coding query in the textbox and get results instantly from the local model._

---

## 5. Demo

{% include figure.liquid path="assets/img/p_rag/codeninja_demo.png" class="img-fluid rounded z-depth-1" %}

<div class="caption">
    Gradio-powered web interface for Codeninja, running locally with Ollama.
</div>

---

## Key Features

- **Custom AI Model**: Built on top of `codellama`, customized with a system prompt.
- **Local Inference**: Runs entirely on your machine with Ollama.
- **Context Awareness**: Keeps a history of previous prompts.
- **Web Interface**: Simple, clean Gradio app.
- **Privacy-Preserving**: No data leaves your machine.

---

## Resources

- 💻 [View Source on GitHub](https://github.com/SurajBhar/codeninja)
- 📄 [Project Documentation](https://github.com/SurajBhar/codeninja/blob/main/README.md)
