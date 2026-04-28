import Link from "next/link";
import { Button } from "@/components/ui/button";

export function TopNavigation() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-bold">
          SummarizeAI
        </Link>

        <div className="flex gap-4">
          <Link href="/signin">
            <Button variant="ghost">Sign In</Button>
          </Link>

          <Link href="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}