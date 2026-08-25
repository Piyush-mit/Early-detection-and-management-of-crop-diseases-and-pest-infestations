"use client";

import {
  AlertCircle,
  CheckCircle2,
  FileImage,
  Leaf,
  LoaderCircle,
  RotateCcw,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import {
  formatDiseaseName,
  predictLeaf,
  type PredictionResult,
} from "@/lib/prediction-api";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 10 * 1024 * 1024;

type ImageDetails = {
  width: number;
  height: number;
};

function formatConfidence(confidence: number) {
  return `${Math.max(0, Math.min(100, confidence)).toFixed(2)}%`;
}

function ConfidenceBar({
  confidence,
  emphasis = false,
}: {
  confidence: number;
  emphasis?: boolean;
}) {
  const value = Math.max(0, Math.min(100, confidence));

  return (
    <div
      className="h-2 overflow-hidden rounded-full bg-emerald-950/10"
      aria-hidden="true"
    >
      <div
        className={`h-full rounded-full ${
          emphasis ? "bg-emerald-600" : "bg-emerald-500/65"
        }`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export function LeafDiagnosis() {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageDetails, setImageDetails] = useState<ImageDetails | null>(null);
  const [status, setStatus] = useState<
    "idle" | "selected" | "analyzing" | "success" | "error"
  >("idle");
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const selectFile = (nextFile: File | undefined) => {
    if (!nextFile) return;

    if (!ACCEPTED_TYPES.includes(nextFile.type)) {
      setError("Please choose a JPG, JPEG, PNG, or WEBP image.");
      setStatus("error");
      return;
    }

    if (nextFile.size > MAX_FILE_SIZE) {
      setError(
        "That image is larger than 10 MB. Please choose a smaller image.",
      );
      setStatus("error");
      return;
    }

    const nextPreviewUrl = URL.createObjectURL(nextFile);

    setFile(nextFile);
    setPreviewUrl(nextPreviewUrl);
    setImageDetails(null);
    setResult(null);
    setError(null);
    setStatus("selected");

    const image = new Image();

    image.onload = () => {
      setImageDetails({
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    };

    image.src = nextPreviewUrl;
  };

  const reset = () => {
    setFile(null);
    setPreviewUrl(null);
    setImageDetails(null);
    setResult(null);
    setError(null);
    setStatus("idle");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const analyze = async () => {
    if (!file || status === "analyzing") {
      if (!file) {
        setError("Choose a leaf image before starting an analysis.");
        setStatus("error");
      }

      return;
    }

    setStatus("analyzing");
    setError(null);
    setResult(null);

    try {
      const prediction = await predictLeaf(file);

      setResult(prediction);
      setStatus("success");
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Something went wrong. Please try again.",
      );
      setStatus("error");
    }
  };

  const predictions = result?.top_predictions.slice(0, 3) ?? [];

  return (
    <main className="min-h-screen overflow-hidden bg-[#f6faf6] text-[#17352a]">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[34rem] bg-[radial-gradient(circle_at_20%_10%,rgba(161,218,179,.42),transparent_26rem),radial-gradient(circle_at_85%_15%,rgba(224,242,205,.85),transparent_25rem)]" />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <a
          href="#top"
          className="flex items-center gap-2.5 rounded-lg font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-4"
        >
          <span className="grid size-10 place-items-center rounded-xl bg-emerald-700 text-white shadow-sm">
            <Leaf className="size-5" aria-hidden="true" />
          </span>

          <span>
            LeafLens <span className="font-normal text-emerald-800">AI</span>
          </span>
        </a>

        <nav
          className="hidden items-center gap-7 text-sm font-medium text-emerald-950/70 sm:flex"
          aria-label="Main navigation"
        >
          <a
            className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            href="#analyze"
          >
            Analyze
          </a>

          <a
            className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            href="#how-it-works"
          >
            How it works
          </a>
        </nav>
      </header>

      <section
        id="top"
        className="relative z-10 mx-auto max-w-4xl px-5 pb-10 pt-12 text-center sm:px-8 sm:pt-20"
      >
        <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-800/10 bg-white/75 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm backdrop-blur">
          <Sparkles className="size-3.5" aria-hidden="true" />
          Trained to recognize 38 plant conditions
        </div>

        <h1 className="text-balance text-4xl font-semibold tracking-[-0.045em] text-[#14382a] sm:text-6xl">
          See what your leaves are trying to tell you.
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-emerald-950/65 sm:text-lg">
          Upload a clear leaf image and let our AI identify potential plant
          diseases in seconds.
        </p>
      </section>

      <section
        id="analyze"
        className="relative z-10 mx-auto grid w-full max-w-6xl gap-6 px-5 pb-12 sm:px-8 lg:grid-cols-[1.08fr_.92fr]"
      >
        <div className="rounded-[1.75rem] border border-emerald-900/10 bg-white p-4 shadow-[0_20px_50px_-30px_rgba(18,83,48,.35)] sm:p-6">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[.16em] text-emerald-700">
                LEAF ANALYSIS
              </p>

              <h2 className="mt-1 text-xl font-semibold tracking-tight">
                Upload a clear image of a plant leaf
              </h2>
            </div>

            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
              JPG, PNG, WEBP
            </span>
          </div>

          {!previewUrl ? (
            <label
              htmlFor={inputId}
              onDragEnter={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragOver={(event) => event.preventDefault()}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(event) => {
                event.preventDefault();
                setIsDragging(false);
                selectFile(event.dataTransfer.files[0]);
              }}
              className={`flex min-h-80 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 text-center transition ${
                isDragging
                  ? "border-emerald-600 bg-emerald-50"
                  : "border-emerald-900/15 bg-[#fbfdf9] hover:border-emerald-500 hover:bg-emerald-50/50"
              }`}
            >
              <span className="mb-4 grid size-16 place-items-center rounded-2xl bg-emerald-100 text-emerald-700">
                <Upload className="size-7" aria-hidden="true" />
              </span>

              <span className="text-base font-semibold">
                Drop your image here, or browse
              </span>

              <span className="mt-2 max-w-xs text-sm leading-6 text-emerald-950/55">
                Use a well-lit, close-up image with the leaf in focus. Maximum
                size: 10 MB.
              </span>

              <span className="mt-5 rounded-lg border border-emerald-800/15 bg-white px-3 py-2 text-sm font-medium text-emerald-800">
                Choose image
              </span>
            </label>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-emerald-900/10 bg-[#fbfdf9]">
              <div className="relative aspect-[16/10] bg-emerald-950/5">
                <img
                  src={previewUrl}
                  alt={`Preview of ${file?.name ?? "uploaded leaf"}`}
                  className="size-full object-cover"
                />

                <button
                  type="button"
                  onClick={reset}
                  disabled={status === "analyzing"}
                  className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-lg bg-white/95 px-3 py-2 text-sm font-medium text-emerald-950 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                  aria-label="Remove selected image"
                >
                  <X className="size-4" aria-hidden="true" />
                  Remove
                </button>
              </div>

              <div className="flex items-center gap-3 p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
                  <FileImage className="size-5" aria-hidden="true" />
                </span>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{file?.name}</p>

                  <p className="mt-0.5 text-xs text-emerald-950/55">
                    {imageDetails
                      ? `${imageDetails.width} × ${imageDetails.height} px`
                      : "Reading image details…"}
                  </p>
                </div>
              </div>
            </div>
          )}

          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={(event) =>
              selectFile(event.target.files?.[0])
            }
          />

          <button
            type="button"
            onClick={analyze}
            disabled={!file || status === "analyzing"}
            className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-emerald-900/35"
          >
            {status === "analyzing" ? (
              <>
                <LoaderCircle
                  className="size-4 animate-spin"
                  aria-hidden="true"
                />
                Analyzing your leaf…
              </>
            ) : (
              <>
                <ScanSearch className="size-4" aria-hidden="true" />
                Analyze leaf
              </>
            )}
          </button>

          {status === "analyzing" && (
            <p
              className="mt-3 text-center text-sm text-emerald-950/60"
              role="status"
            >
              AI is examining the image for disease patterns.
            </p>
          )}

          {error && (
            <div
              className="mt-4 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-800"
              role="alert"
            >
              <AlertCircle
                className="mt-0.5 size-4 shrink-0"
                aria-hidden="true"
              />
              <p>{error}</p>
            </div>
          )}
        </div>

        <aside
          className="rounded-[1.75rem] border border-emerald-900/10 bg-[#173f2d] p-5 text-white shadow-[0_20px_50px_-30px_rgba(18,83,48,.5)] sm:p-7"
          aria-live="polite"
        >
          {status === "analyzing" ? (
            <LoadingPanel />
          ) : result ? (
            <ResultPanel
              result={result}
              predictions={predictions}
              onReset={reset}
            />
          ) : (
            <EmptyResultPanel />
          )}
        </aside>
      </section>

      <section
        id="how-it-works"
        className="relative z-10 mx-auto grid max-w-5xl gap-4 px-5 pb-16 sm:grid-cols-3 sm:px-8"
      >
        {[
          "Upload a leaf photo",
          "AI examines visual patterns",
          "Review the predicted condition",
        ].map((step, index) => (
          <div
            key={step}
            className="rounded-2xl border border-emerald-900/10 bg-white/60 p-5"
          >
            <span className="text-xs font-bold tracking-[.15em] text-emerald-700">
              0{index + 1}
            </span>

            <p className="mt-2 font-medium text-emerald-950">{step}</p>
          </div>
        ))}
      </section>

      <footer className="border-t border-emerald-900/10 px-5 py-6 text-center text-sm text-emerald-950/55">
        LeafLens AI · Built with Next.js, FastAPI, and TensorFlow
      </footer>
    </main>
  );
}

function EmptyResultPanel() {
  return (
    <div className="flex min-h-96 flex-col justify-between">
      <div>
        <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-emerald-200">
          <ShieldCheck className="size-6" aria-hidden="true" />
        </span>

        <p className="mt-8 text-xs font-bold tracking-[.16em] text-emerald-200">
          READY WHEN YOU ARE
        </p>

        <h2 className="mt-2 text-2xl font-semibold tracking-tight">
          Your diagnosis will appear here.
        </h2>

        <p className="mt-3 max-w-sm leading-7 text-emerald-50/70">
          Upload a leaf image to see the predicted condition, confidence
          score, and alternative matches.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-emerald-50/75">
        <CheckCircle2
          className="mb-2 size-5 text-emerald-200"
          aria-hidden="true"
        />
        For the best result, avoid heavy shadows and keep the leaf centered.
      </div>
    </div>
  );
}

function LoadingPanel() {
  return (
    <div className="flex min-h-96 flex-col items-center justify-center text-center">
      <LoaderCircle
        className="size-12 animate-spin text-emerald-200"
        aria-hidden="true"
      />

      <p className="mt-6 text-xs font-bold tracking-[.16em] text-emerald-200">
        PROCESSING IMAGE
      </p>

      <h2 className="mt-2 text-2xl font-semibold">
        Looking for disease patterns.
      </h2>

      <p className="mt-3 max-w-xs leading-7 text-emerald-50/70">
        This usually takes only a few seconds.
      </p>
    </div>
  );
}

function ResultPanel({
  result,
  predictions,
  onReset,
}: {
  result: PredictionResult;
  predictions: PredictionResult["top_predictions"];
  onReset: () => void;
}) {
  return (
    <div>
      <p className="text-xs font-bold tracking-[.16em] text-emerald-200">
        DIAGNOSIS
      </p>

      <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight">
        {formatDiseaseName(result.disease)}
      </h2>

      <div className="mt-7 rounded-2xl bg-white p-5 text-[#17352a]">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-[.15em] text-emerald-700">
              CONFIDENCE
            </p>

            <p className="mt-1 text-3xl font-semibold tracking-tight">
              {formatConfidence(result.confidence)}
            </p>
          </div>

          <CheckCircle2
            className="mb-1 size-6 text-emerald-600"
            aria-hidden="true"
          />
        </div>

        <div className="mt-4">
          <ConfidenceBar confidence={result.confidence} emphasis />
        </div>
      </div>

      <div className="mt-7">
        <h3 className="text-sm font-semibold">Top predictions</h3>

        <ol className="mt-3 space-y-3">
          {predictions.map((prediction, index) => (
            <li
              key={`${prediction.disease}-${index}`}
              className={`rounded-xl border p-3 ${
                index === 0
                  ? "border-emerald-300 bg-white/10"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="min-w-0 truncate text-sm font-medium">
                  <span className="mr-2 text-emerald-200">
                    {index + 1}
                  </span>

                  {formatDiseaseName(prediction.disease)}
                </span>

                <span className="shrink-0 text-sm font-semibold">
                  {formatConfidence(prediction.confidence)}
                </span>
              </div>

              <div className="mt-2">
                <ConfidenceBar
                  confidence={prediction.confidence}
                  emphasis={index === 0}
                />
              </div>
            </li>
          ))}
        </ol>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/25 px-4 py-3 text-sm font-semibold transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#173f2d]"
      >
        <RotateCcw className="size-4" aria-hidden="true" />
        Analyze another image
      </button>
    </div>
  );
}