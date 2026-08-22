# import os
# import json
# import io

# from fastapi import FastAPI, UploadFile, File, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from PIL import Image

# from predict import predict_image


# BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# CLASS_NAMES_PATH = os.path.join(
#     BASE_DIR,
#     "models",
#     "class_names.json"
# )


# with open(CLASS_NAMES_PATH, "r") as f:
#     class_names = json.load(f)


# app = FastAPI(
#     title="Plant Disease Detection API",
#     description="AI-powered plant disease detection system",
#     version="1.0.0"
# )


# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "http://localhost:3000"
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# @app.get("/")
# def root():
#     return {
#         "success": True,
#         "message": "Plant Disease Detection API is running",
#         "model": "EfficientNetB0",
#         "classes": len(class_names)
#     }


# @app.get("/health")
# def health():
#     return {
#         "success": True,
#         "status": "healthy",
#         "model_loaded": True
#     }


# @app.get("/diseases")
# def get_diseases():
#     return {
#         "success": True,
#         "total": len(class_names),
#         "diseases": class_names
#     }


# @app.post("/predict")
# async def predict(file: UploadFile = File(...)):

#     allowed_types = [
#         "image/jpeg",
#         "image/png",
#         "image/jpg",
#         "image/webp"
#     ]

#     if file.content_type not in allowed_types:
#         raise HTTPException(
#             status_code=400,
#             detail="Only JPG, JPEG, PNG and WEBP images are supported."
#         )

#     image_bytes = await file.read()

#     if not image_bytes:
#         raise HTTPException(
#             status_code=400,
#             detail="Uploaded image is empty."
#         )

#     try:
#         image = Image.open(
#             io.BytesIO(image_bytes)
#         ).convert("RGB")

#     except Exception:
#         raise HTTPException(
#             status_code=400,
#             detail="Invalid image file."
#         )

#     try:
#         result = predict_image(image)

#     except Exception as e:
#         raise HTTPException(
#             status_code=500,
#             detail=f"Prediction failed: {str(e)}"
#         )

#     confidence = result["confidence"]

#     if confidence >= 90:
#         severity = "high_confidence"
#         advisory = "The model is highly confident in this prediction. Consider consulting an agriculture expert for treatment confirmation."

#     elif confidence >= 70:
#         severity = "moderate_confidence"
#         advisory = "The model has moderate confidence. Consider checking the plant manually or consulting an agriculture expert."

#     else:
#         severity = "low_confidence"
#         advisory = "The model has low confidence. Please upload a clearer leaf image or consult an agriculture expert."

#     return {
#         "success": True,
#         "filename": file.filename,
#         "prediction": {
#             "disease": result["disease"],
#             "confidence": result["confidence"],
#             "status": severity
#         },
#         "advisory": advisory
#     }

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="CropCare AI API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "success": True,
        "message": "CropCare AI API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model": "not trained yet"
    }