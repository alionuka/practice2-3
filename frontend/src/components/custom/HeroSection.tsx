import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="container mx-auto py-24 text-center">
      <h1 className="text-5xl font-bold tracking-tight">
        Summarize videos with AI
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
        Upload your video and get a clear AI-generated summary in seconds.
      </p>

      <div className="mt-8">
        <Button size="lg">Get Started</Button>
      </div>
    </section>
  );
}