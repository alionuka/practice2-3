import { CheckCircle, Clock, Cloud } from "lucide-react";

import type { TFeature, TFeaturesSection } from "@/types";

const iconMap = {
  CLOCK_ICON: Clock,
  CHECK_ICON: CheckCircle,
  CLOUD_ICON: Cloud,
};

function FeatureCard({ feature }: { feature: TFeature }) {
  const Icon = iconMap[feature.icon] ?? CheckCircle;

  return (
    <div className="rounded-xl border bg-background p-6 shadow-sm">
      <Icon className="mb-4 h-8 w-8" />

      <h3 className="text-xl font-semibold">{feature.heading}</h3>

      <p className="mt-2 text-muted-foreground">{feature.subHeading}</p>
    </div>
  );
}

export function SiteFeaturesSection({ data }: { data: TFeaturesSection }) {
  if (!data) return null;

  const features = data.features ?? [];

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <h2 className="text-3xl font-bold md:text-4xl">{data.title}</h2>

        <p className="mt-4 text-lg text-muted-foreground">
          {data.description}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </section>
  );
}