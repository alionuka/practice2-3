export function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="container mx-auto py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} SummarizeAI. All rights reserved.
      </div>
    </footer>
  );
}