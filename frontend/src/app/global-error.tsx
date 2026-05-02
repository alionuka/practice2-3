"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);

  return (
    <html lang="en">
      <body>
        <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
          <h1 className="text-4xl font-bold">Something went wrong</h1>
          <p className="mt-3 text-muted-foreground">
            An unexpected error occurred.
          </p>

          <button
            type="button"
            onClick={() => reset()}
            className="mt-6 rounded-md border px-4 py-2"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}