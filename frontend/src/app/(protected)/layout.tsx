import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { actions } from "@/data/actions";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt");

  if (!jwt) {
    redirect("/signin");
  }

  return (
    <div className="grid min-h-screen grid-cols-[240px_1fr]">
      <aside className="border-r bg-muted/40">
        <div className="flex h-full flex-col">
          <div className="border-b px-6 py-4">
            <Link href="/dashboard" className="font-bold">
              SummarizeAI
            </Link>
          </div>

          <nav className="flex flex-col gap-2 p-4 text-sm">
            <Link href="/dashboard" className="rounded-md px-3 py-2 hover:bg-muted">
              Dashboard
            </Link>
            <Link href="/profile" className="rounded-md px-3 py-2 hover:bg-muted">
              Profile
            </Link>
            <form action={actions.auth.logoutAction} className="p-4">
  <button type="submit" className="rounded-md px-3 py-2 text-sm hover:bg-muted">
    Logout
  </button>
</form>
          </nav>
        </div>
      </aside>

      <main>{children}</main>
    </div>
  );
}