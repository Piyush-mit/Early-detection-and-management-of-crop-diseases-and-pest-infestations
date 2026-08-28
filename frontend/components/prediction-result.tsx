import {
  AlertTriangle,
  BadgeCheck,
  Bug,
  ShieldCheck,
  Sprout,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { getLocalizedDiseaseInfo } from "@/lib/disease-info";
import { type Locale } from "@/i18n/routing";
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
    amber: "border-emerald-900/10 bg-[#fbfdf9]",
    blue: "border-emerald-900/10 bg-[#fbfdf9]",
    emerald: "border-emerald-900/10 bg-[#fbfdf9]",
  };

  return (
    <div className={`rounded-2xl border p-5 ${toneClasses[tone]}`}>
      <h3 className="flex items-center gap-2.5 text-sm font-semibold text-emerald-950">
        <span className="grid size-7 place-items-center rounded-lg bg-emerald-100 text-emerald-700">
          <Icon className="size-4" aria-hidden="true" />
        </span>
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5 text-sm leading-6 text-emerald-950/65">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-600/60" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UnknownDiseaseDetails({ predictedClass }: PredictionResultProps) {
  const t = useTranslations("PredictionResult");

  return (
    <section
      className="mx-auto w-full max-w-6xl px-5 pb-12 sm:px-8"
      aria-labelledby="disease-details-title"
    >
      <div className="rounded-[1.75rem] border border-emerald-900/10 bg-white p-6 shadow-[0_20px_50px_-35px_rgba(18,83,48,.35)] sm:p-8">
        <div className="flex gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
            <AlertTriangle className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-bold tracking-[.16em] text-emerald-700">
              {t("conditionEyebrow")}
            </p>
            <h2 id="disease-details-title" className="mt-1 text-lg font-semibold tracking-tight text-emerald-950">
              {t("unknownTitle")}
            </h2>
            <p className="mt-1 leading-6 text-emerald-950/60">
              {t("unknownDescription", { disease: formatDiseaseName(predictedClass) })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function getDetailLabels(isHealthy: boolean, t: ReturnType<typeof useTranslations>) {
  if (isHealthy) {
    return {
      eyebrow: t("healthyEyebrow"),
      heading: t("healthyHeading"),
      summary: t("healthySummary"),
      symptoms: t("healthyIndicators"),
      prevention: t("keepHealthy"),
      treatment: t("recommendedCare"),
    };
  }

  return {
    eyebrow: t("conditionEyebrow"),
    heading: t("conditionHeading"),
    summary: t("conditionSummary"),
    symptoms: t("commonSymptoms"),
    prevention: t("prevention"),
    treatment: t("treatment"),
  };
}

export function PredictionResult({ predictedClass }: PredictionResultProps) {
  const t = useTranslations("PredictionResult");
  const locale = useLocale() as Locale;
  const info = getLocalizedDiseaseInfo(predictedClass, locale);

  if (!info) {
    return <UnknownDiseaseDetails predictedClass={predictedClass} />;
  }

  const labels = getDetailLabels(info.is_healthy, t);
  const StatusIcon = info.is_healthy ? BadgeCheck : AlertTriangle;
  const statusClasses = info.is_healthy
    ? "border-emerald-200/80 bg-emerald-50"
    : "border-emerald-900/10 bg-[#fbfdf9]";
  const iconClasses = info.is_healthy
    ? "bg-emerald-600 text-white"
    : "bg-emerald-700 text-white";

  return (
    <section
      className="mx-auto w-full max-w-6xl px-5 pb-12 sm:px-8"
      aria-labelledby="disease-details-title"
    >
      <div className="overflow-hidden rounded-[1.75rem] border border-emerald-900/10 bg-white shadow-[0_20px_50px_-35px_rgba(18,83,48,.35)]">
        <div className={`border-b border-emerald-900/10 p-6 sm:p-8 ${statusClasses}`}>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex gap-4">
              <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${iconClasses}`}>
                <StatusIcon className="size-6" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold tracking-[.16em] text-emerald-700">
                  {labels.eyebrow}
                </p>
                <h2
                  id="disease-details-title"
                  className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl"
                >
                  {info.disease_name}
                </h2>
                <p className="mt-2 max-w-2xl leading-7 text-emerald-950/60">
                  {info.description}
                </p>
              </div>
            </div>
            <span className="w-fit rounded-full border border-emerald-800/10 bg-white/80 px-3 py-1 text-sm font-medium text-emerald-800">
              {info.crop}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
              <Sprout className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-semibold text-emerald-950">{labels.heading}</h3>
              <p className="text-sm text-emerald-950/60">{labels.summary}</p>
            </div>
          </div>

          {!info.is_healthy && (
            <div className="mb-5 rounded-2xl border border-emerald-900/10 bg-[#fbfdf9] p-5">
              <h3 className="flex items-center gap-2.5 text-sm font-semibold text-emerald-950">
                <span className="grid size-7 place-items-center rounded-lg bg-emerald-100 text-emerald-700">
                  <Bug className="size-4" aria-hidden="true" />
                </span>
                {t("likelyCause")}
              </h3>
              <p className="mt-2 text-sm leading-6 text-emerald-950/65">{info.cause}</p>
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
              {t("disclaimer")}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
