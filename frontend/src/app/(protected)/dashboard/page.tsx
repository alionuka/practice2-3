import { UploadFileForm } from "@/components/forms/upload-file-form";
import { SummaryForm } from "@/components/forms/summary-form";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="container mx-auto py-12">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-4 text-muted-foreground">
        Welcome to your protected dashboard.
      </p>
      <Link
  href="/dashboard/summaries"
  className="inline-block rounded-md border px-4 py-2"
>
  View my summaries
</Link>
<SummaryForm />
      <UploadFileForm />
    </main>
  );
}