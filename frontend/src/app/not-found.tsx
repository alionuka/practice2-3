import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Page not found</h2>
      <p className="mt-2 text-muted-foreground">
        Sorry, we could not find the page you are looking for.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-md border px-4 py-2 hover:bg-muted"
      >
        Back home
      </Link>
    </main>
  );
}