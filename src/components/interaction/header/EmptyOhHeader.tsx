'use client'

import Terminal from "@/icons/terminal.svg";
import { RowLayout } from "../layout/RowLayout";
import { useRouter } from "next/navigation";

export function EmptyOhHeader({
  children = null,
  className = "",
  session = true
}: {
  children?: React.ReactNode;
  className?: string;
  session?: boolean
}) {
  const router = useRouter()

  const onclick = () => {
    if (session) router.push('/')
  }

  return (
    <div
      className={`flex flex-col items-stretch justify-start min-h-7.5 bg-oh-blue border-b-4 border-black text-2xl text-white p-2 ${className}`}
    >
      <RowLayout className="justify-between">
        <h1 onClick={() => onclick()} className="flex items-center hover:cursor-pointer">
          <div className="w-6 h-6 border-3 border-white mr-2 text-base">
            <Terminal />
          </div>
          open<strong>hack</strong>
        </h1>
        <RowLayout className="flex-0!">{children}</RowLayout>
      </RowLayout>
    </div>
  );
}
