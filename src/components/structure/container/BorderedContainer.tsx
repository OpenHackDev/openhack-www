export function BorderedContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center min-h-[30px] bg-white border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${className}`}
    >
      {children}
    </div>
  );
}
