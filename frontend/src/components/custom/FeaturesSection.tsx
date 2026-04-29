import { CheckCircle } from "lucide-react";

export function FeaturesSection({ data }: { data: any }) {
  return (
    <section className="container mx-auto py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold">{data.heading}</h2>
        <p className="mt-4 text-muted-foreground">{data.subHeading}</p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {data.feature?.map((item: any, index: number) => (
  <div key={`${item.heading}-${item.id}-${index}`} className="rounded-lg border p-6">
            <CheckCircle className="mb-4 h-6 w-6" />
            <h3 className="text-lg font-semibold">{item.heading}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}