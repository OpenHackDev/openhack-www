"use client"

import { useRouter } from "next/navigation";
import { EmptyOhHeader } from "./EmptyOhHeader";
import Link from "next/link";

function HeaderLink({
  href = "",
  onclick,
  children,
}: {
  href?: string;
  onclick?: () => void;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const redirect = () => {
    if (href != "") {
      router.push(href)
    } else onclick!()
  }

  return (
    <Link
      
      className="text-sm text-white/80 ml-5 hover:text-white cursor-pointer transition-colors duration-200 flex items-center overflow-visible"
      href={href}
      onClick={redirect}
    >
      {children}
    </Link>
  );
}

function SignOutButton({
  href = "",
  onclick,
  children,
}: {
  href?: string;
  onclick?: () => void;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const redirect = () => {
    if (href != "") {
      router.push(href)
    } else onclick!()
  }

  return (
    <a
      
      className="text-sm text-white/80 ml-5 hover:text-white cursor-pointer transition-colors duration-200 flex items-center overflow-visible"
      onClick={redirect}
    >
      {children}
    </a>
  );
}

export function BaseOhHeader({ className = "" }: { className?: string }) {
  return (
    <EmptyOhHeader className={className}>
      <HeaderLink href="https://app.openhack.dev/auth/register">register</HeaderLink>
      <HeaderLink href="https://app.openhack.dev/auth/login">login</HeaderLink>
    </EmptyOhHeader>
  );
}
