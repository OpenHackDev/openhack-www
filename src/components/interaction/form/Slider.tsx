"use client";

export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label = "",
  className = "",
  disabled = false,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 max-w-xs ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {label && <span className="text-sm font-semibold shrink-0">{label}</span>}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className="oh-slider flex-1 h-2 appearance-none cursor-pointer disabled:cursor-not-allowed"
      />
      <span className="text-sm font-bold min-w-[2ch] text-right">{value}</span>
    </div>
  );
}
