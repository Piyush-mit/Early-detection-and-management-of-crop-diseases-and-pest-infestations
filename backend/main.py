import io
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, UnidentifiedImageError

from predict import predict_image

app = FastAPI(title="Plant Disease Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://your-frontend-domain.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Plant Disease Detection API"}


# Changed to a standard synchronous `def` so FastAPI offloads it to a thread pool
@app.post("/predict")
def predict(file: UploadFile = File(...)):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file is not a valid image.")

    try:
        image_bytes = file.file.read()
        image = Image.open(io.BytesIO(image_bytes))
        image.load()  
        
    except (UnidentifiedImageError, ValueError):
        raise HTTPException(status_code=400, detail="Corrupted or unsupported image format.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading file: {str(e)}")
    finally:
        file.file.close()

    try:
        result = predict_image(image)

        return {
            "success": True,
            "filename": file.filename,
            **result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference error: {str(e)}")