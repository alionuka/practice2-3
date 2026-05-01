import { UploadFileForm } from "@/components/forms/upload-file-form";
import { SummaryForm } from "@/components/forms/summary-form";

export default function DashboardPage() {
  return (
    <main className="container mx-auto py-12">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-4 text-muted-foreground">
        Welcome to your protected dashboard.
      </p>
<SummaryForm />
      <UploadFileForm />
    </main>
  );
}