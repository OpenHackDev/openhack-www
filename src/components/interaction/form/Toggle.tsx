"use client";

export function Toggle({
  checked,
  onChange,
  label = "",
  className = "",
  disabled = false,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <label
      className={`inline-flex items-center gap-1.5 text-sm font-semibold select-none ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
    >
      <div
        className={`relative w-10 h-5 border-3 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-colors ${
          checked ? "bg-oh-green" : "bg-gray-300"
        }`}
        onClick={disabled ? undefined : () => onChange(!checked)}
      >
        <div
          className={`absolute top-0 w-[calc(var(--spacing)*4+2px)] h-full bg-white border-l-2 border-r-2 border-black transition-all ${
            checked ? "left-[calc(100%-16px)]" : "left-[-2px]"
          }`}
        />
      </div>
      {label && <span>{label}</span>}
    </label>
  );
}
