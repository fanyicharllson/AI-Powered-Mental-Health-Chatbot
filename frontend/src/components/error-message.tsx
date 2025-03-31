import { Info } from "lucide-react";

interface ErrorMessageProps {
  error: string | null;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) return null;

  return (
    <div className="mt-4 p-4 border border-red-200 rounded-md bg-red-50 text-red-600 animate-in fade-in duration-300">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          <Info className="h-5 w-5 text-red-400" />
        </div>
        <div>
          <h3 className="text-sm font-medium">Error</h3>
          <div className="mt-1 text-sm">{error}</div>
        </div>
      </div>
    </div>
  );
}
