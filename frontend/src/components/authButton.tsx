import LoadingSpinner from "../Loaders/loader1";

interface SignUpButtonProps {
  isSubmitting?: boolean;
  onClick?: () => void;
  className?: string;
  text: string;
  stateText: string;
}

export default function AuthButton({
  isSubmitting = false,
  onClick,
  stateText,
  text,
  className = "",
}: SignUpButtonProps) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`w-full py-2.5 px-10 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:cursor-not-allowed transition-all duration-300 ${className}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <div className="flex items-center justify-center gap-2">
          <LoadingSpinner />
          <span className="inline-block animate-pulse">{stateText}</span>
        </div>
      ) : (
        text
      )}
    </button>
  );
}
