"use client";

import { useState } from "react";

interface PredictionResult {
  success: boolean;
  filename: string;
  disease: string;
  confidence: number;
  top_predictions: { disease: string; confidence: number }[];
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setResult(null);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Updated target URL to explicit IPv4 address
      const response = await fetch("/api/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to get a prediction from the server.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="max-w-xl w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Plant Disease Detector
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Upload an image of a leaf to identify potential diseases.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="flex flex-col items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG or JPEG</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {previewUrl && (
            <div className="relative h-64 w-full rounded-lg overflow-hidden border border-gray-200">
              <img
                src={previewUrl}
                alt="Leaf preview"
                className="object-cover h-full w-full"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={!file || loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Analyzing..." : "Diagnose Plant"}
          </button>
        </form>

        {error && (
          <div className="p-4 mt-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Diagnosis</h2>
            <div className="bg-green-50 rounded-lg p-4 mb-6 border border-green-200">
              <p className="text-lg text-green-900 font-semibold">
                {result.disease.replace(/_/g, " ")}
              </p>
              <p className="text-sm text-green-700 mt-1">
                Confidence: <span className="font-bold">{result.confidence}%</span>
              </p>
            </div>

            <h3 className="text-md font-medium text-gray-900 mb-3">
              Top Alternative Predictions
            </h3>
            <ul className="space-y-3">
              {result.top_predictions.slice(1).map((pred, idx) => (
                <li key={idx} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{pred.disease.replace(/_/g, " ")}</span>
                  <span className="text-gray-900 font-medium">{pred.confidence}%</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}