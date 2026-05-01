"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  text: string;
  loadingText: string;
}

export function SubmitButton({ text, loadingText }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? loadingText : text}
    </Button>
  );
}