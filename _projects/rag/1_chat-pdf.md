---
layout: page
title: Chat with Your Documents
description: Retrieval-Augmented Generation (RAG) chatbot with NVIDIA NIM and Streamlit
img: assets/img/p_rag/rag_demo.png
importance: 4
category: generative-ai
related_publications: false
---

This project demonstrates how to build a **Retrieval-Augmented Generation (RAG) chatbot** that allows users to upload documents (PDFs) and query them in natural language. The chatbot is implemented in **Streamlit**, powered by **NVIDIA NIM** for embeddings and inference, and uses **LangChain** for document processing.  

The result: a clean interface where you can *ask questions to your own documents* and get context-aware answers in real time.  

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="/assets/img/p_rag/rag_demo.png" title="RAG based Chatbot" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Chatbot Demo
</div>

---

## 1. Environment Setup

The first step is configuring the environment and securely loading your NVIDIA API key.  

```python
from dotenv import load_dotenv
import os

# Load environment variables: API Key
load_dotenv()
os.environ['NVIDIA_API_KEY'] = os.getenv("NVIDIA_API_KEY")
````

*This ensures the app can access NVIDIA’s NIM endpoints without hardcoding secrets.*

---

## 2. Initializing the Model & Embeddings

We use **NVIDIA’s Llama3-70B Instruct** for answering queries, and **NVIDIA Embeddings** for semantic search.

```python
from langchain_nvidia_ai_endpoints import NVIDIAEmbeddings, ChatNVIDIA

# Large Language Model (LLM) for inference
llm = ChatNVIDIA(model="meta/llama3-70b-instruct")

# Embeddings for semantic search
embeddings = NVIDIAEmbeddings()
```

*The combination of embeddings + LLM forms the backbone of the RAG pipeline.*

---

## 3. Loading and Splitting Documents

Users can upload PDFs via the Streamlit sidebar. Documents are split into smaller chunks for better retrieval.

```python
from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Load PDFs
loader = PyPDFDirectoryLoader("./data")
docs = loader.load()

# Split into chunks of ~700 tokens with overlap
text_splitter = RecursiveCharacterTextSplitter(chunk_size=700, chunk_overlap=50)
final_documents = text_splitter.split_documents(docs)
```

*Chunking ensures that answers remain relevant and context-rich.*

---

## 4. Creating a Vector Store with FAISS

Next, embeddings are generated and stored in **FAISS**, enabling fast similarity search.

```python
from langchain_community.vectorstores import FAISS

# Build the vector store
vectors = FAISS.from_documents(final_documents, embeddings)
```

*Now the system can quickly retrieve the most relevant text snippets when answering queries.*

---

## 5. Building the RAG Pipeline

We connect document retrieval with the LLM using a simple chain.

```python
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain

# Custom prompt
prompt = ChatPromptTemplate.from_template("""
Use the context below to answer the question.
<context>{context}</context>
Question: {input}
""")

# Document → Retrieval → LLM chain
document_chain = create_stuff_documents_chain(llm, prompt)
retriever = vectors.as_retriever()
retrieval_chain = create_retrieval_chain(retriever, document_chain)
```

*This ensures that the LLM only answers based on the retrieved documents, improving accuracy.*

---

## 6. Streamlit User Interface

Streamlit provides a simple, interactive chat interface.

```python
import streamlit as st

st.title("Chat with Your Documents")

user_query = st.text_input("Enter your question:")

if st.button("Submit"):
    response = retrieval_chain.invoke({'input': user_query, "context": final_documents})
    st.write("**Bot:**", response['answer'])
```

*Users can upload files, generate embeddings, and chat — all within the browser.*

---

## 7. Visualizing Embeddings

For interpretability, embeddings can be projected into 2D space using **t-SNE**.

```python
from sklearn.manifold import TSNE
import matplotlib.pyplot as plt

def visualize_embeddings(vectors):
    embeddings = [vectors.index.reconstruct(i) for i in range(vectors.index.ntotal)]
    reduced = TSNE(n_components=2, random_state=42).fit_transform(embeddings)
    plt.scatter(reduced[:,0], reduced[:,1])
    st.pyplot(plt)
```

*This visualization shows how document chunks cluster semantically.*

---

## 8. Demo Workflow

1. Upload PDF files via the sidebar.
2. Click **Generate Document Embeddings** to build the FAISS index.
3. Type a question in the chat box.
4. The chatbot retrieves relevant chunks and generates an answer using NVIDIA NIM.

---

## Technical Highlights

* **LangChain + Streamlit** for modular pipeline + UI.
* **NVIDIA NIM (Llama3-70B Instruct)** for large-scale inference.
* **FAISS Vector Store** for fast retrieval.
* **Embedding visualization** with t-SNE.
* **Token-aware truncation** for large-context safety.

---

## Resources
- 💻 [View Source on GitHub](https://github.com/SurajBhar/rag_nim)  
- 📄 [Documentation](https://github.com/SurajBhar/rag_nim/blob/main/README.md) 

---

## Closing Thoughts

This project shows how **RAG pipelines can make documents conversational**, combining retrieval accuracy with the power of modern LLMs.
The same architecture can be extended to:

* Multi-agent chatbots
* Domain-specific knowledge bases
* Real-time enterprise search

