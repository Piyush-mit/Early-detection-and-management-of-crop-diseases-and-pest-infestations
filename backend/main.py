import io
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image

from predict import predict_image

app = FastAPI(title="Plant Disease Detection API")

# Configure CORS to allow Next.js on localhost:3000 / 127.0.0.1:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows requests from any origin (localhost, 127.0.0.1, etc.)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Plant Disease Detection API"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Validate image file type
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File uploaded is not an image.")

    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        
        result = predict_image(image)

        return {
            "success": True,
            "filename": file.filename,
            **result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))