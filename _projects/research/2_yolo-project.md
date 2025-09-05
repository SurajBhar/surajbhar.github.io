---
layout: page
title: Studienarbeit
description: YOLO-Based Real-Time Object Detection for Autonomous Driving in CARLA
img: assets/img/p_research/advantage_higly_occluded_detection_town_3_daytime_w1.PNG
importance: 2
category: research-thesis
related_publications: false
---

# YOLO-Based Real-Time Object Detection for Autonomous Driving in CARLA

This project explored **real-time object detection for autonomous driving** using the [CARLA Simulator](https://carla.org/). A simulated **Tesla Model 3** was equipped with eight cameras, 12 ultrasonic sensors, and a radar to generate **multi-modal synthetic data** for training and evaluating state-of-the-art object detection models.  

A custom dataset of **6,400 annotated images** was created using a **two-stage labeling pipeline**:  
1. Automated annotation with the **GroundedSAM foundation model**.  
2. Manual refinement with **Roboflow** to ensure accuracy.  

The dataset included vehicles, traffic lights, pedestrians, and traffic signs. Models from **YOLOv8, YOLOv9, YOLOv10, and YOLO11 families** were trained and benchmarked. Among them, **YOLOv8m** and **YOLO11m** achieved the best balance of **localization precision and classification accuracy**, scoring highest on the **mAP@0.5:0.95** metric. The **YOLO11m model** was integrated into CARLA for **real-time inference at 30 FPS**.

---

## Key Highlights
- Built a **realistic CARLA-based Tesla Model 3 simulation** with multi-sensor setup.  
- Created a **synthetic dataset** of 6,400 images using a hybrid **GroundedSAM + Roboflow annotation pipeline**.  
- Trained and evaluated **YOLOv8–YOLO11 models** across multiple configurations.  
- Integrated **YOLO11m** into CARLA for **real-time detection in simulation**.  
- Demonstrated strengths of simulation-driven research for **autonomous driving and sensor fusion**.  

---

## Visuals
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/p_research/04_labeling_process.png" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/p_research/14_Component_dia.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Labeling Process (left) and Component Diagram (right).
</div>

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/p_research/Tesla_model_3_2.PNG" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/p_research/advantage_higly_occluded_detection_town_3_daytime_w1.PNG" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Tesla Model 3 simulation setup (left) and real-time detection (right).
</div>

## Video Demonstration
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid path="https://www.youtube.com/embed/-p6EaeNuoKg" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Real-time YOLO11m object detection in CARLA at 30 FPS.
</div>

---

## Resources
- 📄 [Download Project Report PDF](/assets/docs/SB_Studienarbeit.pdf)  
- 💻 [View Source on GitHub](https://github.com/SurajBhar/studienarbeit_repository)  
