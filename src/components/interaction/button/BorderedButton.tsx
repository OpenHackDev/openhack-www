"use client";

export function IconButton({
  children,
  className = "",
  onClick = () => {},
  disabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center h-7.5 w-7.5 text-2xl border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[2px_1px_0px_0px_rgba(0,0,0,1)] ${className} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </div>
  );
}

export function Button({
  children,
  className = "",
  onClick = () => {},
  disabled = false,
  type = "button",
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  type?: "button" | "reset" | "submit" | undefined
}) {
  return (
    <button
      className={`flex flex-col items-center justify-center h-7.5 w-max p-2 border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[2px_1px_0px_0px_rgba(0,0,0,1)] ${className} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      onClick={
        disabled ? undefined : (e) => {
          e.preventDefault();
          onClick(e);
        }
      }
      onMouseDown={
        //Stop highlighting
        disabled
          ? undefined
          : (e) => {
              e.preventDefault();
            }
      }
      type={type}
    >
      {children}
    </button>
  );
}

export function SubmitButton({
  children,
  className = "",
  onClick = () => {},
  disabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  type?: "button" | "reset" | "submit" | undefined
}) {
  return (
    <button
      className={`flex flex-col items-center justify-center h-7.5 w-max p-2 border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[2px_1px_0px_0px_rgba(0,0,0,1)] ${className} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      
      onMouseDown={
        //Stop highlighting
        disabled
          ? undefined
          : (e) => {
              e.preventDefault();
            }
      }
      type="submit"
    >
      {children}
    </button>
  );
}