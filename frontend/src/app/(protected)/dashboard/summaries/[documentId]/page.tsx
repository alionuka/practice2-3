import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { actions } from "@/data/actions";
import { services } from "@/data/services";

type PageProps = {
  params: Promise<{
    documentId: string;
  }>;
};

export default async function SummaryDetailsPage({ params }: PageProps) {
  const { documentId } = await params;

  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  if (!jwt) {
    redirect("/signin");
  }

  const summary = await services.summarize
    .getSummaryByDocumentIdService(documentId, jwt)
    .catch(() => null);

  if (!summary?.data) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <section className="rounded-xl border p-6">
          <h1 className="text-2xl font-bold">Summary not found</h1>

          <Link
            href="/dashboard/summaries"
            className="mt-4 inline-block rounded-md border px-4 py-2"
          >
            Back to summaries
          </Link>
        </section>
      </main>
    );
  }

  const item = summary.data;
  const updateAction = actions.summary.updateSummaryAction.bind(
    null,
    documentId
  );

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 p-6">
      <Link
        href="/dashboard/summaries"
        className="w-fit rounded-md border px-4 py-2 text-sm"
      >
        ← Back to summaries
      </Link>

      <section className="rounded-xl border p-6">
        <h1 className="text-3xl font-bold">Edit Summary</h1>
        <p className="mt-2 text-muted-foreground">
          Video ID: {item.videoId}
        </p>
      </section>

      <form action={updateAction} className="space-y-5 rounded-xl border p-6">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>

          <input
            id="title"
            name="title"
            defaultValue={item.title}
            className="w-full rounded-md border bg-background px-3 py-2"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="text-sm font-medium">
            Content
          </label>

          <textarea
            id="content"
            name="content"
            defaultValue={item.content}
            className="min-h-80 w-full rounded-md border bg-background px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="rounded-md border px-4 py-2 hover:bg-muted"
        >
          Save changes
        </button>
      </form>
    </main>
  );
}