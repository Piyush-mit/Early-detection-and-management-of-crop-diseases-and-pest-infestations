import {
  AlertTriangle,
  BadgeCheck,
  Bug,
  ShieldCheck,
  Sprout,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

import { DISEASE_DATA, type DiseaseInfo } from "@/lib/disease-info";
import { formatDiseaseName } from "@/lib/prediction-api";

type PredictionResultProps = {
  predictedClass: string;
};

type DetailListProps = {
  title: string;
  items: string[];
  icon: LucideIcon;
  tone: "amber" | "blue" | "emerald";
};

function DetailList({ title, items, icon: Icon, tone }: DetailListProps) {
  const toneClasses = {
    amber: "border-amber-200 bg-amber-50 text-amber-950",
    blue: "border-sky-200 bg-sky-50 text-sky-950",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-950",
  };

  return (
    <div className={`rounded-2xl border p-5 ${toneClasses[tone]}`}>
      <h3 className="flex items-center gap-2 text-sm font-bold">
        <Icon className="size-4" aria-hidden="true" />
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5 text-sm leading-6">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-current opacity-60" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UnknownDiseaseDetails({ predictedClass }: PredictionResultProps) {
  return (
    <section
      className="mx-auto w-full max-w-6xl px-5 pb-12 sm:px-8"
      aria-labelledby="disease-details-title"
    >
      <div className="rounded-[1.75rem] border border-amber-200 bg-amber-50 p-6 text-amber-950 sm:p-8">
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <div>
            <h2 id="disease-details-title" className="text-lg font-semibold">
              Details are not available yet
            </h2>
            <p className="mt-1 leading-6 text-amber-900/80">
              The model identified {formatDiseaseName(predictedClass)}, but a
              matching care guide has not been added to the disease dataset.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function getDetailLabels(info: DiseaseInfo) {
  if (info.is_healthy) {
    return {
      eyebrow: "HEALTHY PLANT STATUS",
      heading: "Your plant appears healthy",
      summary: "Keep up these practices to help it stay healthy.",
      symptoms: "Healthy indicators",
      prevention: "Keep it healthy",
      treatment: "Recommended care",
    };
  }

  return {
    eyebrow: "CONDITION GUIDE",
    heading: "What to look for next",
    summary: "Use these signs and practices to guide your next steps.",
    symptoms: "Common symptoms",
    prevention: "Prevention",
    treatment: "Treatment and management",
  };
}

export function PredictionResult({ predictedClass }: PredictionResultProps) {
  const info = DISEASE_DATA[predictedClass];

  if (!info) {
    return <UnknownDiseaseDetails predictedClass={predictedClass} />;
  }

  const labels = getDetailLabels(info);
  const StatusIcon = info.is_healthy ? BadgeCheck : AlertTriangle;
  const statusClasses = info.is_healthy
    ? "border-emerald-200 bg-emerald-50 text-emerald-950"
    : "border-rose-200 bg-rose-50 text-rose-950";
  const iconClasses = info.is_healthy
    ? "bg-emerald-600 text-white"
    : "bg-rose-600 text-white";

  return (
    <section
      className="mx-auto w-full max-w-6xl px-5 pb-12 sm:px-8"
      aria-labelledby="disease-details-title"
    >
      <div className="overflow-hidden rounded-[1.75rem] border border-emerald-900/10 bg-white shadow-[0_20px_50px_-35px_rgba(18,83,48,.35)]">
        <div className={`border-b p-6 sm:p-8 ${statusClasses}`}>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex gap-4">
              <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${iconClasses}`}>
                <StatusIcon className="size-6" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold tracking-[.16em] opacity-70">
                  {labels.eyebrow}
                </p>
                <h2
                  id="disease-details-title"
                  className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl"
                >
                  {info.disease_name}
                </h2>
                <p className="mt-2 max-w-2xl leading-7 opacity-80">
                  {info.description}
                </p>
              </div>
            </div>
            <span className="w-fit rounded-full border border-current/15 bg-white/50 px-3 py-1 text-sm font-semibold">
              {info.crop}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-2">
            <Sprout className="size-5 text-emerald-700" aria-hidden="true" />
            <div>
              <h3 className="font-semibold text-emerald-950">{labels.heading}</h3>
              <p className="text-sm text-emerald-950/60">{labels.summary}</p>
            </div>
          </div>

          {!info.is_healthy && (
            <div className="mb-5 rounded-2xl border border-rose-100 bg-rose-50 p-5">
              <h3 className="flex items-center gap-2 text-sm font-bold text-rose-950">
                <Bug className="size-4" aria-hidden="true" />
                Likely cause
              </h3>
              <p className="mt-2 text-sm leading-6 text-rose-950/80">{info.cause}</p>
            </div>
          )}

          <div className="grid gap-5 lg:grid-cols-2">
            <DetailList
              title={labels.symptoms}
              items={info.symptoms}
              icon={AlertTriangle}
              tone="amber"
            />
            <DetailList
              title={labels.prevention}
              items={info.prevention}
              icon={ShieldCheck}
              tone="blue"
            />
            <div className="lg:col-span-2">
              <DetailList
                title={labels.treatment}
                items={info.treatment}
                icon={Stethoscope}
                tone="emerald"
              />
            </div>
          </div>

          {!info.is_healthy && (
            <p className="mt-5 text-xs leading-5 text-emerald-950/55">
              Confirm the diagnosis with local crop experts before applying any
              treatment. Always follow product labels and local regulations.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
