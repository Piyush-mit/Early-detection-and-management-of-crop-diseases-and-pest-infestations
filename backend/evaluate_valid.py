import os
import json
import numpy as np
import tensorflow as tf
from sklearn.metrics import classification_report, confusion_matrix
# This evaluates your model against the official validation dataset
# Total images:       17,572
# Correct:            17,232
# Incorrect:             340
# Accuracy:             98.07%
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "best_plant_disease_model.keras"
)

VALID_DIR = os.path.join(
    BASE_DIR,
    "New Plant Diseases Dataset(Augmented)",
    "valid"
)

CLASS_NAMES_PATH = os.path.join(
    BASE_DIR,
    "models",
    "class_names.json"
)

IMG_SIZE = (224, 224)
BATCH_SIZE = 32

model = tf.keras.models.load_model(
    MODEL_PATH,
    compile=False
)

with open(CLASS_NAMES_PATH, "r") as f:
    class_names = json.load(f)

print("Number of classes:", len(class_names))
print("Number of validation classes:", len(os.listdir(VALID_DIR)))

valid_ds = tf.keras.utils.image_dataset_from_directory(
    VALID_DIR,
    class_names=class_names,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    shuffle=False
)

predictions = model.predict(
    valid_ds,
    verbose=1
)

y_pred = np.argmax(predictions, axis=1)

y_true = np.concatenate(
    [labels.numpy() for _, labels in valid_ds],
    axis=0
)

accuracy = np.mean(y_true == y_pred)

print("\n" + "=" * 60)
print("VALIDATION DATASET RESULTS")
print("=" * 60)

print(f"Total images: {len(y_true)}")
print(f"Correct predictions: {np.sum(y_true == y_pred)}")
print(f"Incorrect predictions: {np.sum(y_true != y_pred)}")
print(f"Accuracy: {accuracy * 100:.2f}%")

print("\nClassification Report:")

print(
    classification_report(
        y_true,
        y_pred,
        target_names=class_names,
        zero_division=0
    )
)

print("\nConfusion Matrix:")

print(
    confusion_matrix(
        y_true,
        y_pred
    )
)