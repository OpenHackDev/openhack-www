import React from "react";

export function RowLayout({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-stretch flex-row gap-2 flex-1 ${className}`}>
      {children}
    </div>
  );
}
