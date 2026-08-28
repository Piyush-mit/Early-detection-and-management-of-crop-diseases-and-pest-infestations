# 🌿 LeafLens AI

![Next.js](https://img.shields.io/badge/Next.js-App%20Router-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)
![Python](https://img.shields.io/badge/Python-3.10+-yellow?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi)
![TensorFlow](https://img.shields.io/badge/TensorFlow-ML-FF6F00?logo=tensorflow)
![Keras](https://img.shields.io/badge/Keras-Deep%20Learning-D00000?logo=keras)
![EfficientNet](https://img.shields.io/badge/EfficientNetB0-Image%20Classification-blueviolet)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-Styling-cyan?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📌 Overview

**LeafLens AI** is an AI-powered plant health and disease detection system that analyzes leaf images using **deep learning and computer vision**.

The project combines a **Next.js frontend** with a **FastAPI machine-learning backend**. An uploaded image passes through an image localization and segmentation pipeline before being classified by an **ImageNet-pretrained EfficientNetB0** model.

The current classifier supports **38 plant disease and healthy classes** and returns the predicted condition, confidence score, and top-3 predictions.

The frontend also supports **multilingual localization**, allowing the user interface and disease information to be presented in multiple languages while keeping the ML backend language-independent and English-based.

---

## ✨ Features

### 🌿 AI Plant Disease Detection

- Image-based plant disease detection.
- EfficientNetB0-based image classification.
- 38 disease and healthy classes.
- Prediction confidence score.
- Top-3 predictions with confidence values.
- Disease-specific information including symptoms, causes, prevention, and treatment/care.

### 🎯 Image Localization & Segmentation

The image-processing pipeline includes **leaf localization and segmentation** before classification.

```text
Input Image
     ↓
Leaf Localization
     ↓
Leaf Segmentation
     ↓
Relevant Leaf Region
     ↓
Disease Classification
```

This helps reduce the influence of irrelevant background information and allows the classifier to focus on the plant leaf.

### 🖼️ Image Upload & Processing

- Drag-and-drop image upload.
- Image preview before prediction.
- Image metadata display.
- RGB image conversion.
- Image preprocessing and resizing.
- Loading and prediction states.
- Error handling.
- Reset and re-upload functionality.

### 🧠 Machine Learning Pipeline

- ImageNet-pretrained EfficientNetB0.
- Transfer learning.
- Two-stage training:
  - Feature extraction
  - Fine-tuning
- Data augmentation.
- Class weighting for class imbalance.
- Mixed-precision training.
- Early stopping.
- Learning-rate reduction.
- Best-model checkpointing.

### 🌐 Multilingual Frontend

LeafLens AI supports localized frontend content so users can interact with the application in multiple languages.

The localization layer is implemented in the **Next.js frontend**, while the **Python/FastAPI backend remains English-only**.

This separation keeps the ML inference API simple while allowing the user-facing experience to be localized independently.

Current localization includes:

- English
- Hindi
- Additional Indian languages can be added through the same localization structure.

### 🎨 Modern Frontend

- Next.js App Router.
- React 19.
- TypeScript.
- Tailwind CSS.
- Responsive desktop and mobile UI.
- Dark mode support.
- Localized interface.
- Confidence visualization.
- Centralized API integration.
- User-friendly error states.

---

## 📸 Screenshots

### 🏠 Home Page — English

![LeafLens AI Home Page](./frontend/public/home_page_en.png)

### 🏠 Home Page — Hindi

![LeafLens AI Home Page](./frontend/public/home_page_hn.png)

### 📤 Prediction Result

![LeafLens AI Prediction](./frontend/public/response_en.png)

### 💡 Suggestions / Disease Information

![LeafLens AI Suggestions](./frontend/public/suggestions_en.png)

---

## 🧠 AI Pipeline

The complete application pipeline is:

```text
                    User Image
                        ↓
                 Next.js Frontend
                        ↓
               FastAPI /predict API
                        ↓
              Image Preprocessing
                        ↓
               Leaf Localization
                        ↓
               Leaf Segmentation
                        ↓
                 Relevant Leaf
                        ↓
               EfficientNetB0
                        ↓
                Global Average Pooling
                        ↓
                  Dropout (30%)
                        ↓
                 Dense Layer
                  38 Classes
                        ↓
                    Softmax
                        ↓
              Disease Probabilities
                        ↓
             Top-3 Predictions
                        ↓
             Localized Frontend
```

---

## 🔬 Model Architecture

```text
Input Image
224 × 224 × 3
      ↓
Data Augmentation
      ↓
EfficientNetB0
ImageNet Pretrained
      ↓
Global Average Pooling
      ↓
Dropout (30%)
      ↓
Dense Layer
38 Classes
      ↓
Softmax
      ↓
Disease Probabilities
```

### Training Strategy

The model is trained in two stages.

**Phase 1 — Feature Extraction**

The pretrained EfficientNetB0 backbone is frozen while the classification head learns the plant disease classes.

**Phase 2 — Fine-Tuning**

Later layers of EfficientNetB0 are unfrozen and trained with a smaller learning rate so that pretrained features can adapt to plant disease patterns.

---

## 📊 Model Output

The model returns the predicted disease, confidence, and top-3 predictions.

Example:

```json
{
  "disease": "Tomato___Early_blight",
  "confidence": 98.42,
  "top_predictions": [
    {
      "disease": "Tomato___Early_blight",
      "confidence": 98.42
    },
    {
      "disease": "Tomato___Late_blight",
      "confidence": 0.91
    },
    {
      "disease": "Tomato___Leaf_Mold",
      "confidence": 0.31
    }
  ]
}
```

---

## 🔌 API

### `POST /predict`

Accepts a plant leaf image using `multipart/form-data` and returns a structured prediction.

### Request

```text
Content-Type: multipart/form-data

file = <leaf image>
```

### Response

```json
{
  "success": true,
  "filename": "leaf.jpg",
  "disease": "Tomato___Early_blight",
  "confidence": 98.42,
  "top_predictions": [
    {
      "disease": "Tomato___Early_blight",
      "confidence": 98.42
    }
  ]
}
```

The backend API remains **English-only**. Localization is handled by the Next.js frontend.

---

## 🛠️ Tech Stack

### Frontend

- Next.js — App Router
- React 19
- TypeScript
- Tailwind CSS
- next-intl / frontend localization
- Dark mode

### Backend

- Python 3.10+
- FastAPI
- Uvicorn
- Pillow

### Machine Learning

- TensorFlow
- Keras
- EfficientNetB0
- NumPy
- Scikit-learn

### Computer Vision

- Image preprocessing
- Leaf localization
- Leaf segmentation

---

## 📂 Project Structure

```text
SIH/
│
├── backend/
│   ├── main.py
│   ├── predict.py
│   ├── train.py
│   ├── evaluate.py
│   ├── evaluate_vald.py
│   │
│   ├── models/
│   │   ├── best_plant_disease_model.keras
│   │   ├── plant_disease_model.keras
│   │   └── class_names.json
│   │
│   └── test/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── messages/
│   │   ├── en.json
│   │   └── hi.json
│   ├── public/
│   ├── i18n/
│   ├── .env.example
│   └── package.json
│
└── README.md
```

> The exact frontend localization folder names may vary depending on the current Next.js project structure.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd SIH
```

### 2. Backend Setup

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

#### Windows

```bash
venv\Scripts\activate
```

#### Linux / Ubuntu

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend:

```text
http://127.0.0.1:8000/
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
bun install
```

Start the development server:

```bash
bun run dev
```

Frontend:

```text
http://localhost:3000
```

---

## 📈 Current Prototype

The current prototype provides:

- ✅ End-to-end image upload
- ✅ Next.js frontend
- ✅ FastAPI backend
- ✅ Leaf localization
- ✅ Leaf segmentation
- ✅ EfficientNetB0 classification
- ✅ 38 disease/healthy classes
- ✅ Top-3 predictions
- ✅ Confidence scores
- ✅ Disease information
- ✅ Multilingual frontend localization
- ✅ Hindi interface
- ✅ Dark mode
- ✅ Data augmentation
- ✅ Transfer learning
- ✅ Fine-tuning
- ✅ Class weighting
- ✅ Mixed precision
- ✅ Error handling
- ✅ Responsive UI

The current validation accuracy is approximately **98.07%** on the current validation dataset.

> **Note:** Validation accuracy does not guarantee the same performance on real-world images. Complex backgrounds, unusual lighting, blur, multiple leaves, and other uncontrolled conditions can affect predictions. A high softmax confidence score also does not necessarily guarantee that a prediction is correct.

---

## ⚠️ Current Limitations

The system may still struggle with:

- Complex backgrounds
- Poor or unusual lighting
- Multiple leaves in one image
- Very small leaves
- Blurry images
- Image noise
- Images containing objects other than the target leaf
- Real-world conditions that differ significantly from the training data

---

## 🔮 Future Improvements

- More diverse real-world field-image training data.
- Improved leaf localization and segmentation.
- Stronger robustness-focused augmentation.
- Confidence-based image-quality feedback.
- Disease severity estimation.
- Multiple-leaf analysis.
- Plant health monitoring over time.
- Additional Indian language support.
- Mobile application.
- Edge/offline inference.
- Scalable model-serving infrastructure.

---

## 📚 References

### Datasets

**PlantVillage Dataset**  
https://github.com/spMohanty/PlantVillage-Dataset

**PlantDoc Dataset**  
https://www.kaggle.com/datasets/abdulhasibuddin/plant-doc-dataset

### Model

**EfficientNet — Tan & Le (2019)**  
https://proceedings.mlr.press/v97/tan19a.html

### TensorFlow / Keras

**TensorFlow EfficientNetB0**  
https://www.tensorflow.org/api_docs/python/tf/keras/applications/EfficientNetB0

**Keras EfficientNet Fine-Tuning**  
https://keras.io/examples/vision/image_classification_efficientnet_fine_tuning/

---

## 📌 Project Status

**Current Stage: Working Prototype 🚀**

LeafLens AI currently provides an end-to-end plant disease detection pipeline:

```text
Image Upload
     ↓
Next.js Frontend
     ↓
FastAPI Backend
     ↓
Image Preprocessing
     ↓
Leaf Localization
     ↓
Leaf Segmentation
     ↓
EfficientNetB0
     ↓
38-Class Prediction
     ↓
Confidence + Top-3
     ↓
Localized Disease Information
     ↓
Next.js Results UI
```

The primary focus going forward is **improving real-world robustness, strengthening the localization and segmentation pipeline, expanding multilingual accessibility, and preparing the system for scalable deployment**.

---

## 📄 License

This project is licensed under the **MIT License**.
