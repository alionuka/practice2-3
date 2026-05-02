"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { actions } from "@/data/actions";

type Props = {
  documentId: string;
};

export function DeleteSummaryButton({ documentId }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this summary?"
    );

    if (!confirmed) return;

    startTransition(async () => {
      try {
        await actions.summary.deleteSummaryAction(documentId);
        toast.success("Summary deleted.");
      } catch {
        toast.error("Failed to delete summary.");
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="rounded-md border px-3 py-2 text-sm hover:bg-muted disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}