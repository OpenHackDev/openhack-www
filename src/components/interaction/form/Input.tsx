"use client";

import { HTMLInputTypeAttribute, useState } from "react";
import { Tooltip } from "./Tooltip";

export function Input({
  value,
  onChange,
  type = "text",
  placeholder = "",
  className = "",
  validate,
  disabled = false,
}: {
  value: string;
  onChange: (value: string) => void;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
  validate?: (value: string) => string | null;
  disabled?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const error = validate ? validate(value) : null;

  return (
    <Tooltip message={error ?? ""} visible={!!error && focused}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-xs h-7.5 px-2 text-sm bg-white border-4 border-black outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] placeholder:text-gray-400 focus:border-oh-blue ${
          error ? "border-oh-red" : ""
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      />
    </Tooltip>
  );
}
