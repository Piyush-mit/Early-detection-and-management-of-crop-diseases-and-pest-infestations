import os
import json
import numpy as np
import tensorflow as tf
from PIL import Image


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "plant_disease_model.keras"
)

CLASS_NAMES_PATH = os.path.join(
    BASE_DIR,
    "models",
    "class_names.json"
)


model = tf.keras.models.load_model(
    MODEL_PATH,
    compile=False
)


with open(CLASS_NAMES_PATH, "r") as f:
    class_names = json.load(f)


def predict_image(image: Image.Image):

    image = image.convert("RGB")

    image = image.resize((224, 224))

    image_array = np.array(image, dtype=np.float32)

    image_array = np.expand_dims(
        image_array,
        axis=0
    )

    predictions = model.predict(
        image_array,
        verbose=0
    )[0]

    predicted_index = int(
        np.argmax(predictions)
    )

    confidence = float(
        predictions[predicted_index]
    )

    disease = class_names[predicted_index]

    return {
        "disease": disease,
        "confidence": round(confidence * 100, 2)
    }