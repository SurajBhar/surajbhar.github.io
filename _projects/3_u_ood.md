---
layout: page
title: Research Project on Robustness
description: Out-of-Distribution (OOD) Robustness with AugMix
img: assets/img/projects/robustness.png
importance: 3
category: research-thesis
related_publications: false
---

# Out-of-Distribution Robustness with AugMix

This project explored **out-of-distribution (OOD) robustness** in image classification using the **AugMix data augmentation technique**. AugMix generates diverse augmented views of input images and enforces consistency across them, which significantly improves robustness and uncertainty calibration without extensive tuning.  

My study implemented **ResNet18** and **ConvNeXt-tiny** architectures (both pretrained and non-pretrained) on **CIFAR-10, CIFAR-10-C, and CIFAR-10-P** datasets. I benchmarked models using different **optimizers (AdamW, SGD)** and **learning rate schedulers (CosineAnnealingLR, LambdaLR)**, and tuned hyperparameters for ConvNeXt-tiny.  

---

## Key Highlights
- Implemented **ResNet18 & ConvNeXt-tiny** in the AugMix framework.  
- Benchmarked across **CIFAR-10, CIFAR-10-C, and CIFAR-10-P**.  
- Compared optimizers & schedulers: AdamW + CosineAnnealingLR vs. SGD + LambdaLR.  
- Showed that **AdamW + CosineAnnealingLR outperformed SGD** for corruption robustness, while ConvNeXt-tiny achieved the best clean accuracy with larger batch sizes.  
- Demonstrated the trade-off between **corruption robustness and flip probability**.  

---

## Results
<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
    {% include image.liquid path="assets/img/p_research/Table4.png" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include image.liquid path="assets/img/p_research/Matplotlib_plot.png" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
    Performance comparison of ResNet18 and ConvNeXt-tiny models with different optimizers and schedulers on CIFAR-10 and CIFAR-10-C.
</div>

---

## Resources
- 📄 [Download Project Report PDF](assets/docs/Bhardwaj-Suraj-1531066.pdf)  
- 💻 [View Source on GitHub](https://github.com/SurajBhar/augmix)  
- 📑 [ICLR 2020 AugMix Paper](https://arxiv.org/abs/1912.02781)  

