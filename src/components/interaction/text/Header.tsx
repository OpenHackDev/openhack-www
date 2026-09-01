export function Header({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`font-bold underline text-lg gap-2 flex flex-row items-center ${className}`}
    >
      {children}
    </div>
  );
}

export function SubHeader({
  children,
  className = "",
  href = "",
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  return (
    <div
      className={`font-semibold text-md gap-2 flex flex-row items-center ${className}`}
    >
        {children}
    </div>
  );
}

export function Hyperlink({
  children,
  className = "",
  href = "",
}: {
  children: React.ReactNode;
  className?: string;
  href: string
}) {
  return (
    <SubHeader className={`hover:underline ${className}`}>
      <a href={href}>
        {children}
      </a>
    </SubHeader>
  )
}