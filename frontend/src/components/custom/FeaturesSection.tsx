import { CheckCircle } from "lucide-react";

const features = [
  "Upload video files",
  "Generate AI summaries",
  "Save summaries in dashboard",
];

export function FeaturesSection() {
  return (
    <section className="container mx-auto py-16">
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <div key={feature} className="rounded-lg border p-6">
            <CheckCircle className="mb-4 h-6 w-6" />
            <h3 className="text-lg font-semibold">{feature}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}