---
layout: page
title: Face Mask Detection
description: Real-time mask detection using VGG16 and HaarCascade
img: assets/img/p_vision/face_mask_detection_featured.jpg
importance: 5
category: computer-vision
related_publications: false
---

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
