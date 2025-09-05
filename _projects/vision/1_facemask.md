---
layout: page
title: Face Mask Detection
description: Real-time mask detection using VGG16 and HaarCascade
img: assets/img/p_vision/face_mask_detection_featured.jpg
importance: 1
category: vision-multimodal
related_publications: false
---

# Face Mask Detection – Real-Time Computer Vision  

This project demonstrates **real-time face mask detection** using a transfer learning approach with **VGG16** for classification and **HaarCascade** for face detection.  

A notebook version is available below for reproducibility:  

{::nomarkdown}
{% assign jupyter_path = 'assets/jupyter/Face_Mask_Detection.ipynb' | relative_url %}
{% capture notebook_exists %}{% file_exists assets/jupyter/Face_Mask_Detection.ipynb %}{% endcapture %}
{% if notebook_exists == 'true' %}
  {% jupyter_notebook jupyter_path %}
{% else %}
  <p>Sorry, the notebook you are looking for does not exist.</p>
{% endif %}
{:/nomarkdown}

---

## Project Overview
- **Dataset**: 7,553 labeled images (with_mask: 3,725 · without_mask: 3,828), from [Kaggle](https://www.kaggle.com/datasets/omkargurav/face-mask-dataset).  
- **Model**: Pretrained **VGG16** with a custom dense output layer (sigmoid, binary classification).  
- **Face Detection**: OpenCV’s HaarCascade used to localize faces in webcam input.  
- **Deployment**: Real-time detection via webcam feed with bounding boxes and predictions.  

---

## Model Architecture
The pretrained **VGG16** was adapted for binary classification. All convolutional layers were frozen to prevent overfitting, and a new dense layer was added for mask/no-mask classification.  

![Model Architecture](https://user-images.githubusercontent.com/115887529/222911838-e94a9a7c-66ae-4fce-a0d9-2d5a68ba91a1.png)  
<div class="caption">VGG16-based architecture adapted for binary classification.</div>

---

## Training
- **Loss Function**: Binary Cross-Entropy  
- **Optimizer**: Adam  
- **Epochs**: 5  
- **Split**: Train/test using `train_test_split` (scikit-learn)  

![Training Curves](https://user-images.githubusercontent.com/115887529/222912347-5e516a6d-34e6-498a-98ee-4764f9244c2c.png)  
<div class="caption">Training vs validation accuracy across epochs.</div>

---

## Real-Time Detection
OpenCV’s **HaarCascade** detects faces in the video stream. Detected faces are passed to the trained classifier, and predictions (mask / no mask) are displayed on the live feed.  

---

## Key Takeaways
- Transfer learning with **VGG16** achieves reliable mask detection with limited data.  
- **HaarCascade** ensures lightweight face detection in real time.  
- The system demonstrates practical AI for public health and safety.  

---

## Future Work
- Experiment with **alternative pretrained models** (e.g., ResNet50, MobileNet).  
- Improve robustness on diverse datasets with occlusion and low light.  
- Deploy on **edge devices** for real-world use cases.  

## Resources 
- 💻 [View Source and Testing on GitHub](https://github.com/SurajBhar/Face_Mask_Detection/tree/main) 