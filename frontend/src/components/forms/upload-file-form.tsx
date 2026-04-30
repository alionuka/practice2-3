import { actions } from "@/data/actions";

export function UploadFileForm() {
  return (
    <form
      action={actions.upload.uploadFileAction}
      className="mt-8 max-w-md space-y-4"
    >
      <div>
        <label htmlFor="file" className="block text-sm font-medium">
          Upload video file
        </label>

        <input
          id="file"
          name="file"
          type="file"
          className="mt-2 block w-full rounded-md border p-2"
        />
      </div>

      <button type="submit" className="rounded-md bg-black px-4 py-2 text-white">
        Upload
      </button>
    </form>
  );
}