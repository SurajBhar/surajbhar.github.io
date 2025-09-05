---
layout: page
title: Master Thesis
description: Improved Driver Distraction Detection Using Self-Supervised Learning
img: assets/img/p_research/thesis_views_daa.PNG
importance: 1
category: research-thesis
related_publications: false
---

# Master Thesis – Improved Driver Distraction Detection Using Self-Supervised Learning

This project investigates **driver distraction detection** using the [Drive&Act dataset](https://driveandact.com) and **Vision Transformers (ViTs)** trained with supervised and self-supervised learning (SSL).  
The core challenge addressed was **imbalanced data** and **generalization across views and modalities (RGB vs. IR)**.  
To tackle this, I proposed the **Clustered Feature Weighting (CFW) algorithm**, a *label-free sampling strategy* that balances training batches using unsupervised clustering (HDBSCAN) and weighted random sampling.  

CFW improved dataset balance and boosted **cross-modality generalization** by up to **+7.17% balanced accuracy** when adapting RGB-trained models to infrared imagery. SSL-based encoders (DINOv2) consistently outperformed supervised ViTs in generalization, particularly for grayscale and IR modalities, affirming their potential for **robust, adaptable distraction detection systems** in automotive safety.  

---

## Thesis Information
- **Title**: *Improved Driver Distraction Detection Using Self-Supervised Learning*  
- **Author**: Suraj Bhardwaj  
- **Institution**: Universität Siegen, Faculty of Electrical Engineering and Computer Science  
- **Program**: M.Sc. International Graduate Studies in Mechatronics  
- **Supervisors**: Prof. Dr. Michael Möller, Dr. Jovita Lukasik, David Lerch M.Sc.  
- **Submission Date**: 15 May 2024  

---

## Key Highlights
- Introduced **Clustered Feature Weighting (CFW)** to mitigate dataset imbalance in driver distraction detection.  
- Demonstrated **cross-view** and **cross-modality generalization** (RGB ↔ IR) using Vision Transformers.  
- Achieved **+7.17% improvement in balanced accuracy** on cross-modality tests with SSL-based encoders.  
- Collaboration with **Fraunhofer IOSB**, advancing research in **Human–AI Interaction**.  

---

## Resources
- 📄 [Download Thesis PDF](/assets/docs/Suraj_Bhardwaj_M_Thesis.pdf)  
- 💻 [View Source on GitHub](https://github.com/SurajBhar/masterarbeit_sb/tree/main)  
