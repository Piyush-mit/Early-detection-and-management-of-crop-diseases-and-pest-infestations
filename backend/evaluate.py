import os
import json
import re
import numpy as np
import tensorflow as tf
from PIL import Image
from sklearn.metrics import (
    classification_report,
    confusion_matrix,
    accuracy_score
)

from predict import preprocess_leaf_image


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "best_plant_disease_model.keras"
)

CLASS_NAMES_PATH = os.path.join(
    BASE_DIR,
    "models",
    "class_names.json"
)

TEST_DIR = os.path.join(
    BASE_DIR,
    "test"
)


print("Loading model...")

model = tf.keras.models.load_model(
    MODEL_PATH,
    compile=False
)

print("Model loaded successfully.")


with open(CLASS_NAMES_PATH, "r") as f:
    class_names = json.load(f)

print(f"Number of classes: {len(class_names)}")


def normalize(text):
    text = text.lower()
    text = re.sub(r"[^a-z0-9]", "", text)
    return text


def get_actual_class(filename):

    name = normalize(
        os.path.splitext(filename)[0]
    )

    mappings = {

        "apple": {
            "cedarrust": "Apple___Cedar_apple_rust",
            "scab": "Apple___Apple_scab",
            "blackrot": "Apple___Black_rot",
            "healthy": "Apple___healthy"
        },

        "blueberry": {
            "healthy": "Blueberry___healthy"
        },

        "cherry": {
            "powderymildew":
                "Cherry_(including_sour)___Powdery_mildew",

            "healthy":
                "Cherry_(including_sour)___healthy"
        },

        "corn": {
            "commonrust":
                "Corn_(maize)___Common_rust_",

            "grayleafspot":
                "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",

            "northernleafblight":
                "Corn_(maize)___Northern_Leaf_Blight",

            "healthy":
                "Corn_(maize)___healthy"
        },

        "grape": {
            "blackrot":
                "Grape___Black_rot",

            "esca":
                "Grape___Esca_(Black_Measles)",

            "leafblight":
                "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",

            "healthy":
                "Grape___healthy"
        },

        "orange": {
            "haunglongbing":
                "Orange___Haunglongbing_(Citrus_greening)"
        },

        "peach": {
            "bacterialspot":
                "Peach___Bacterial_spot",

            "healthy":
                "Peach___healthy"
        },

        "pepperbell": {
            "bacterialspot":
                "Pepper,_bell___Bacterial_spot",

            "healthy":
                "Pepper,_bell___healthy"
        },

        "potato": {
            "earlyblight":
                "Potato___Early_blight",

            "lateblight":
                "Potato___Late_blight",

            "healthy":
                "Potato___healthy"
        },

        "raspberry": {
            "healthy":
                "Raspberry___healthy"
        },

        "soybean": {
            "healthy":
                "Soybean___healthy"
        },

        "squash": {
            "powderymildew":
                "Squash___Powdery_mildew"
        },

        "strawberry": {
            "leafscorch":
                "Strawberry___Leaf_scorch",

            "healthy":
                "Strawberry___healthy"
        },

        "tomato": {
            "bacterialspot":
                "Tomato___Bacterial_spot",

            "earlyblight":
                "Tomato___Early_blight",

            "lateblight":
                "Tomato___Late_blight",

            "leafmold":
                "Tomato___Leaf_Mold",

            "septorialeafspot":
                "Tomato___Septoria_leaf_spot",

            "spidermites":
                "Tomato___Spider_mites Two-spotted_spider_mite",

            "targetspot":
                "Tomato___Target_Spot",

            "yellowcurlvirus":
                "Tomato___Tomato_Yellow_Leaf_Curl_Virus",

            "mosaicvirus":
                "Tomato___Tomato_mosaic_virus",

            "healthy":
                "Tomato___healthy"
        }
    }

    for plant, diseases in mappings.items():

        if name.startswith(plant):

            for disease, class_name in diseases.items():

                if disease in name:
                    return class_name

    return None


y_true = []
y_pred = []

correct = 0
total = 0

supported_extensions = (
    ".jpg",
    ".jpeg",
    ".png",
    ".bmp",
    ".webp"
)

print("\n" + "=" * 60)
print("STARTING TEST EVALUATION")
print("=" * 60)


for filename in sorted(os.listdir(TEST_DIR)):


    if not filename.lower().endswith(
        supported_extensions
    ):
        continue


    actual_class = get_actual_class(
        filename
    )

    if actual_class is None:

        print(
            f"SKIPPED: Could not determine class -> {filename}"
        )

        continue


    image_path = os.path.join(
        TEST_DIR,
        filename
    )


    try:


        image = Image.open(
            image_path
        ).convert("RGB")


        image_array = preprocess_leaf_image(
            image
        )


        predictions = model.predict(
            image_array,
            verbose=0
        )[0]

        predicted_index = int(
            np.argmax(predictions)
        )

        predicted_class = class_names[
            predicted_index
        ]


        # ----------------------------------------------------
        # Confidence
        # ----------------------------------------------------

        confidence = float(
            predictions[predicted_index]
        )

        y_true.append(
            actual_class
        )

        y_pred.append(
            predicted_class
        )

        total += 1

        if actual_class == predicted_class:

            correct += 1
            result = "✓"

        else:

            result = "✗"


        print(
            f"{result} {filename}"
        )

        print(
            f"   Actual:      {actual_class}"
        )

        print(
            f"   Predicted:   {predicted_class}"
        )

        print(
            f"   Confidence:  {confidence * 100:.2f}%"
        )

        print()


    except Exception as e:

        print(
            f"ERROR: {filename} -> {e}"
        )


if total == 0:

    print(
        "No valid test images were found."
    )

    exit()


accuracy = accuracy_score(
    y_true,
    y_pred
)


print("=" * 60)
print("TEST RESULTS")
print("=" * 60)

print(
    f"Total test images: {total}"
)

print(
    f"Correct predictions: {correct}"
)

print(
    f"Incorrect predictions: {total - correct}"
)

print(
    f"Test Accuracy: {accuracy * 100:.2f}%"
)


print("\nClassification Report:")

print(
    classification_report(
        y_true,
        y_pred,
        labels=class_names,
        zero_division=0
    )
)


print("\nConfusion Matrix:")

print(
    confusion_matrix(
        y_true,
        y_pred,
        labels=class_names
    )
)