"use client";

import { useEffect, useState } from "react";

interface BackendResponse {
  success: boolean;
  message: string;
}

export default function Home() {
  const [data, setData] = useState<BackendResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBackend = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/`
        );

        if (!response.ok) {
          throw new Error("Backend request failed");
        }

        const result: BackendResponse = await response.json();

        setData(result);
      } catch (err) {
        setError("Could not connect to FastAPI");
      } finally {
        setLoading(false);
      }
    };

    fetchBackend();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-md rounded-xl border p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold">
          CropCare AI
        </h1>

        {loading && (
          <p className="text-gray-500">
            Connecting to backend...
          </p>
        )}

        {error && (
          <div className="rounded-lg bg-red-100 p-4 text-red-700">
            {error}
          </div>
        )}

        {data && (
          <div className="space-y-3">
            <div>
              <span className="font-semibold">Status: </span>
              {data.success ? "Connected" : "Failed"}
            </div>

            <div>
              <span className="font-semibold">Backend: </span>
              {data.message}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}