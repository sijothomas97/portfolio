---
title: "Handwritten Text Recognition: Deep Learning"
description: "Deep learning OCR system using ResNet, AlexNet, and VGG architectures to recognise and digitise handwritten text from images."
featured: true
featuredOrder: 2
tags: ["Deep Learning", "Computer Vision", "CNN", "Python"]
techStack: ["Python", "TensorFlow", "ResNet", "AlexNet", "VGG", "OpenCV", "NumPy"]
github: "https://github.com/sijothomas97/handwritten-text-reading"
date: 2023-09-01
---

## The Problem

Handwritten text recognition remains a significant challenge in computer vision. Unlike printed text, handwriting varies enormously between individuals — in slant, spacing, character formation, and stroke thickness. Accurate OCR (Optical Character Recognition) for handwritten text has applications in document digitisation, postal automation, and historical archive preservation, but requires models that can generalise across diverse handwriting styles.

## My Approach

I designed and trained three state-of-the-art convolutional neural network architectures to compare their effectiveness for handwritten text recognition:

**ResNet (Residual Networks)** — Leveraging skip connections to train deeper networks without degradation. The residual learning framework allows the model to learn identity mappings, making it feasible to train 50+ layer networks that capture fine-grained handwriting features.

**AlexNet** — As a baseline deep CNN, providing a reference point for comparing more advanced architectures. While simpler, it established the performance floor and helped identify where architectural innovations made the biggest difference.

**VGG (Visual Geometry Group)** — Using a uniform architecture of small 3x3 convolution filters stacked deeply, demonstrating that network depth with small receptive fields can capture complex spatial hierarchies in handwritten characters.

**Pipeline**:

1. Image preprocessing: grayscale conversion, noise reduction, contrast normalisation, binarisation
2. Data augmentation: rotation, scaling, elastic deformation to simulate handwriting variation
3. Model training with learning rate scheduling and early stopping
4. Ensemble evaluation comparing accuracy, precision, recall, and F1-score

## Results

- Successfully trained and compared all three architectures on handwritten text datasets
- ResNet achieved the highest recognition accuracy, benefiting from deeper feature extraction via skip connections
- Data augmentation with elastic deformation improved generalisation by simulating natural handwriting variation
- Built a complete pipeline from raw image input to character prediction output

## What I Learned

Transfer learning and architectural innovations (especially skip connections) have a profound impact on vision tasks. The preprocessing pipeline proved just as important as the model architecture — clean, well-augmented input data was the single biggest lever for improving accuracy.
