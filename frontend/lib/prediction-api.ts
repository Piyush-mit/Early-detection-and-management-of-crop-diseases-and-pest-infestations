export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://127.0.0.1:8000";

export type TopPrediction = {
  disease: string;
  confidence: number;
};

export type PredictionResult = {
  success: boolean;
  filename: string;
  disease: string;
  confidence: number;
  top_predictions: TopPrediction[];
};

function isPredictionResult(value: unknown): value is PredictionResult {
  if (!value || typeof value !== "object") return false;

  const result = value as Partial<PredictionResult>;
  return (
    result.success === true &&
    typeof result.filename === "string" &&
    typeof result.disease === "string" &&
    typeof result.confidence === "number" &&
    Array.isArray(result.top_predictions) &&
    result.top_predictions.every(
      (prediction) =>
        prediction &&
        typeof prediction.disease === "string" &&
        typeof prediction.confidence === "number",
    )
  );
}

export function formatDiseaseName(disease: string) {
  return disease
    .replace(/___/g, " ")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export async function predictLeaf(file: File): Promise<PredictionResult> {
  const formData = new FormData();
  formData.append("file", file);

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      body: formData,
    });
  } catch {
    throw new Error(
      "connection",
    );
  }

  if (!response.ok) {
    if (response.status === 400 || response.status === 422) {
      throw new Error("invalidImage");
    }

    throw new Error("server");
  }

  const data: unknown = await response.json().catch(() => null);
  if (!isPredictionResult(data)) {
    throw new Error("unexpected");
  }

  return data;
}
