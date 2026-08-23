import os
import json
import numpy as np
import tensorflow as tf


gpus = tf.config.list_physical_devices('GPU')
if gpus:
    try:
        for gpu in gpus:
            tf.config.experimental.set_memory_growth(gpu, True)
        print("GPU Memory Growth Enabled")
    except RuntimeError as e:
        print(e)

from tensorflow.keras import mixed_precision
from sklearn.utils.class_weight import compute_class_weight

mixed_precision.set_global_policy("mixed_float16")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

TRAIN_DIR = os.path.join(
    BASE_DIR,
    "New Plant Diseases Dataset(Augmented)",
    "train"
)

VALID_DIR = os.path.join(
    BASE_DIR,
    "New Plant Diseases Dataset(Augmented)",
    "valid"
)

IMG_SIZE = (224, 224)
BATCH_SIZE = 32
SEED = 42

MODEL_DIR = os.path.join(BASE_DIR, "models")
os.makedirs(MODEL_DIR, exist_ok=True)

tf.random.set_seed(SEED)
np.random.seed(SEED)

train_ds = tf.keras.utils.image_dataset_from_directory(
    TRAIN_DIR,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    shuffle=True,
    seed=SEED
)

valid_ds = tf.keras.utils.image_dataset_from_directory(
    VALID_DIR,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    shuffle=False
)

class_names = train_ds.class_names
num_classes = len(class_names)
print(f"Total Classes Found: {num_classes}")

with open(os.path.join(MODEL_DIR, "class_names.json"), "w") as f:
    json.dump(class_names, f, indent=4)


train_labels = np.concatenate([labels.numpy() for _, labels in train_ds], axis=0)
class_weights_array = compute_class_weight(
    class_weight="balanced",
    classes=np.unique(train_labels),
    y=train_labels
)
class_weight_dict = dict(enumerate(class_weights_array))


AUTOTUNE = tf.data.AUTOTUNE
train_ds = train_ds.prefetch(AUTOTUNE)
valid_ds = valid_ds.prefetch(AUTOTUNE)


data_augmentation = tf.keras.Sequential(
    [
        tf.keras.layers.RandomFlip("horizontal_and_vertical"),
        tf.keras.layers.RandomRotation(0.15),
        tf.keras.layers.RandomZoom(0.2),
        tf.keras.layers.RandomTranslation(0.1, 0.1),
        tf.keras.layers.RandomContrast(0.1),
    ],
    name="data_augmentation"
)

base_model = tf.keras.applications.EfficientNetB0(
    input_shape=(224, 224, 3),
    include_top=False,
    weights="imagenet"
)
base_model.trainable = False

inputs = tf.keras.Input(shape=(224, 224, 3), name="leaf_image")
x = data_augmentation(inputs)

x = base_model(x, training=False)
x = tf.keras.layers.GlobalAveragePooling2D()(x)
x = tf.keras.layers.Dropout(0.3)(x)

outputs = tf.keras.layers.Dense(
    num_classes,
    activation="softmax",
    dtype="float32",
    name="disease_prediction"
)(x)

model = tf.keras.Model(inputs, outputs, name="PlantDiseaseEfficientNet")


model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-3),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

callbacks = [
    tf.keras.callbacks.ModelCheckpoint(
        os.path.join(MODEL_DIR, "best_plant_disease_model.keras"),
        monitor="val_accuracy",
        save_best_only=True,
        mode="max"
    ),
    tf.keras.callbacks.EarlyStopping(
        monitor="val_accuracy",
        patience=4,
        restore_best_weights=True
    ),
    tf.keras.callbacks.ReduceLROnPlateau(
        monitor="val_loss",
        factor=0.2,
        patience=2,
        min_lr=1e-7
    )
]

print("Starting Feature Extraction...")
model.fit(
    train_ds,
    validation_data=valid_ds,
    epochs=5,
    class_weight=class_weight_dict,
    callbacks=callbacks
)

base_model.trainable = True
for layer in base_model.layers[:-30]:
    layer.trainable = False

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-5),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

print("Starting Fine-Tuning...")
model.fit(
    train_ds,
    validation_data=valid_ds,
    epochs=10,
    class_weight=class_weight_dict,
    callbacks=callbacks
)

final_model_path = os.path.join(MODEL_DIR, "plant_disease_model.keras")
model.save(final_model_path)

loss, accuracy = model.evaluate(valid_ds, verbose=0)
print(f"Final Validation Accuracy: {accuracy:.4f}")
print(f"Final Validation Loss: {loss:.4f}")