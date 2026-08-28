import os
import json
import numpy as np
import cv2
import tensorflow as tf
from PIL import Image
from rembg import remove, new_session



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

IMG_SIZE = (224, 224)


print("Loading plant disease model...")

model = tf.keras.models.load_model(
    MODEL_PATH,
    compile=False
)

print("Model loaded successfully.")


with open(CLASS_NAMES_PATH, "r") as f:
    class_names = json.load(f)

print(f"Loaded {len(class_names)} classes.")



print("Initializing leaf segmentation model...")

session = new_session(
    "u2net",
    providers=[
        "CUDAExecutionProvider",
        "CPUExecutionProvider"
    ]
)

print("Segmentation model ready.")


def preprocess_leaf_image(image: Image.Image) -> np.ndarray:
    """
    Performs the same preprocessing used during training:

    1. Convert uploaded image to OpenCV format
    2. Segment foreground using U²-Net
    3. Find the leaf bounding box
    4. Crop the leaf
    5. Remove background
    6. Resize to 224x224
    7. Convert to NumPy array
    8. Add batch dimension
    """

    rgb_image = image.convert("RGB")

    img = cv2.cvtColor(
        np.array(rgb_image),
        cv2.COLOR_RGB2BGR
    )

    segmented_img = remove(
        img,
        session=session
    )

    if len(segmented_img.shape) == 3 and segmented_img.shape[2] == 4:

        alpha = segmented_img[:, :, 3]

        _, thresh = cv2.threshold(
            alpha,
            1,
            255,
            cv2.THRESH_BINARY
        )

    else:

        gray = cv2.cvtColor(
            segmented_img,
            cv2.COLOR_BGR2GRAY
        )

        _, thresh = cv2.threshold(
            gray,
            1,
            255,
            cv2.THRESH_BINARY
        )

    contours, _ = cv2.findContours(
        thresh,
        cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_SIMPLE
    )

    if contours:

        largest_contour = max(
            contours,
            key=cv2.contourArea
        )

        x, y, w, h = cv2.boundingRect(
            largest_contour
        )

        cropped_leaf = segmented_img[
            y:y + h,
            x:x + w
        ]


        if (
            len(cropped_leaf.shape) == 3
            and cropped_leaf.shape[2] == 4
        ):

            black_bg = np.zeros(
                (h, w, 3),
                dtype=np.uint8
            )

            alpha_channel = (
                cropped_leaf[:, :, 3] / 255.0
            )

            color_channels = cropped_leaf[:, :, :3]

            for c in range(3):
                black_bg[:, :, c] = (
                    alpha_channel *
                    color_channels[:, :, c]
                ).astype(np.uint8)

            cropped_leaf = black_bg


    else:

        if (
            len(segmented_img.shape) == 3
            and segmented_img.shape[2] == 4
        ):

            cropped_leaf = cv2.cvtColor(
                segmented_img,
                cv2.COLOR_BGRA2BGR
            )

        else:

            cropped_leaf = segmented_img


    rgb_leaf = cv2.cvtColor(
        cropped_leaf,
        cv2.COLOR_BGR2RGB
    )


    resized_leaf = cv2.resize(
        rgb_leaf,
        IMG_SIZE,
        interpolation=cv2.INTER_AREA
    )


    image_array = resized_leaf.astype(
        np.float32
    )


    image_array = np.expand_dims(
        image_array,
        axis=0
    )

    return image_array


def predict_image(image: Image.Image):
    """
    Performs complete inference:

    User Image
        ↓
    Leaf Segmentation
        ↓
    Leaf Localization
        ↓
    Leaf Crop
        ↓
    EfficientNetB0
        ↓
    38-Class Prediction
        ↓
    Top-3 Results
    """


    image_array = preprocess_leaf_image(
        image
    )


    predictions = model.predict(
        image_array,
        verbose=0
    )[0]


    top_indices = np.argsort(
        predictions
    )[-3:][::-1]

    top_predictions = []

    for index in top_indices:

        top_predictions.append(
            {
                "disease": class_names[index],
                "confidence": round(
                    float(predictions[index]) * 100,
                    2
                )
            }
        )
        
    predicted_index = int(
        top_indices[0]
    )

    predicted_class = class_names[
        predicted_index
    ]

    confidence = float(
        predictions[predicted_index]
    )
    return {
        "disease": predicted_class,

        "confidence": round(
            confidence * 100,
            2
        ),

        "top_predictions": top_predictions
    }