"use client";

export function Tooltip({
  children,
  message,
  visible,
  side = "top",
  className = "",
}: {
  children: React.ReactNode;
  message: string;
  visible: boolean;
  side?: "top" | "bottom";
  className?: string;
}) {
  return (
    <div className={`relative w-max ${className}`}>
      {children}
      {visible && (
        <div
          className={`absolute left-1/2 -translate-x-1/2 z-50 whitespace-nowrap px-3 py-1.5 text-sm font-semibold bg-oh-red text-white border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
            side === "top" ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-0 h-0 ${
              side === "top"
                ? "top-full border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-black"
                : "bottom-full border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-black"
            }`}
          />
          {message}
        </div>
      )}
    </div>
  );
}
