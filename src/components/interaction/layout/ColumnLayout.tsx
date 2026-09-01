import React from "react";

export function ColumnLayout({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-stretch flex-col gap-2 flex-1 ${className}`}>
      {children}
    </div>
  );
}
