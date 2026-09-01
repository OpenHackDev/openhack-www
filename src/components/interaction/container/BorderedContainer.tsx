export function BorderedContainer({
  children,
  className = "",
  header = null,
  padding = true,
}: {
  children: React.ReactNode;
  className?: string;
  header?: string | React.ReactNode;
  padding?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-stretch justify-start min-h-[30px] bg-white border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${className}`}
    >
      {header && (
        <div className="flex items-center justify-center w-full border-b-4 border-black">
          {header}
        </div>
      )}
      <div className={`${padding ? "p-2" : ""} flex flex-col flex-1`}>
        {children}
      </div>
    </div>
  );
}
