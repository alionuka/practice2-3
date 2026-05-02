import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { services } from "@/data/services";
import { Search } from "@/components/custom/search";
import { PaginationComponent } from "@/components/custom/pagination-component";
import { DeleteSummaryButton } from "@/components/custom/summaries/delete-summary-button";

type SearchParamsProps = {
  searchParams?: Promise<{
    page?: string;
    query?: string;
  }>;
};

export default async function SummariesPage({
  searchParams,
}: SearchParamsProps) {
  const params = await searchParams;

  const query = params?.query || "";
  const currentPage = Number(params?.page) || 1;

  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  if (!jwt) {
    redirect("/signin");
  }

  const { data, meta } = await services.summarize.getSummariesService(
    jwt,
    query,
    currentPage
  );

  const pageCount = meta?.pagination?.pageCount || 1;

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 p-6">
      <section className="rounded-xl border p-6">
        <h1 className="text-3xl font-bold">My Summaries</h1>
        <p className="mt-2 text-muted-foreground">
          View, search and manage generated video summaries.
        </p>
      </section>

      <section className="flex flex-col gap-3 rounded-xl border p-4">
        <Search />

        <Link
          href="/dashboard"
          className="w-fit rounded-md border px-4 py-2 text-sm"
        >
          Create new summary
        </Link>
      </section>

      {data.length === 0 ? (
        <section className="rounded-xl border p-6">
          <p className="text-muted-foreground">
            No summaries found.
          </p>
        </section>
      ) : (
        <section className="grid gap-4">
          {data.map((summary) => (
            <article
              key={summary.documentId}
              className="rounded-xl border p-5"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row">
                <div>
                  <h2 className="text-xl font-semibold">{summary.title}</h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Video ID: {summary.videoId}
                  </p>

                  <p className="mt-3 line-clamp-3 text-sm leading-6">
                    {summary.content}
                  </p>
                </div>

                <div className="flex shrink-0 gap-2">
                  <Link
                    href={`/dashboard/summaries/${summary.documentId}`}
                    className="rounded-md border px-3 py-2 text-sm hover:bg-muted"
                  >
                    View
                  </Link>

                  <DeleteSummaryButton documentId={summary.documentId} />
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      <PaginationComponent
        pageCount={pageCount}
        currentPage={currentPage}
      />
    </main>
  );
}