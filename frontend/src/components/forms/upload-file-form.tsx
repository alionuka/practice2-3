"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { actions } from "@/data/actions";
import type { UploadFormState } from "@/data/actions/upload";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/custom/submit-button";

const INITIAL_STATE: UploadFormState = {
  success: false,
  message: "",
};

export function UploadFileForm() {
  const [formState, formAction] = useActionState(
    actions.upload.uploadFileAction,
    INITIAL_STATE
  );

  useEffect(() => {
    if (!formState.message) return;

    if (formState.success) {
      toast.success(formState.message);
    } else {
      toast.error(formState.message);
    }
  }, [formState]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="file">Profile image</Label>
        <Input
          id="file"
          name="file"
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
        />
      </div>

      <SubmitButton text="Upload image" loadingText="Uploading..." />
    </form>
  );
}