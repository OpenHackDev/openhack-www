"use client";

import Check from "@/icons/check.svg";

export function Checkbox({
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
        className={`flex items-center justify-center w-5 h-5 border-3 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${
          checked ? "bg-oh-green" : "bg-white"
        }`}
        onClick={disabled ? undefined : () => onChange(!checked)}
      >
        {checked && <Check className="text-white" />}
      </div>
      {label && <span>{label}</span>}
    </label>
  );
}
