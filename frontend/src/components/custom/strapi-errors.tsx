type StrapiErrorsProps = {
  error: {
    status: number;
    name: string;
    message: string;
    details?: unknown;
  } | null;
};

export function StrapiErrors({ error }: StrapiErrorsProps) {
  if (!error?.message) return null;

  return (
    <div className="text-pink-500 text-sm italic py-2">
      {error.message}
    </div>
  );
}