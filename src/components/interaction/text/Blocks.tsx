export const CalloutTypes = {
  Note: {
    borderColor: "border-blue-500",
    backgroundColor: "bg-blue-100",
    altText: "Note",
    icon: "📝",
  },
  Error: {
    borderColor: "border-red-500",
    backgroundColor: "bg-red-100",
    altText: "Error",
    icon: "❌",
  },
  Warning: {
    borderColor: "border-yellow-500",
    backgroundColor: "bg-yellow-100",
    altText: "Warning",
    icon: "⚠️",
  },
};

export function Callout({
  children,
  className = "",
  type = CalloutTypes.Note,
}: {
  children: React.ReactNode;
  className?: string;
  type?: (typeof CalloutTypes)[keyof typeof CalloutTypes];
}) {
  return (
    <div
      className={`border-l-4 ${type.borderColor} ${type.backgroundColor} p-3 pr-7 mt-2 mb-2 w-max italic text-sm ${className}`}
    >
      <span className="mr-2" role="img" aria-label={type.altText}>
        {type.icon}
      </span>
      {children}
    </div>
  );
}
