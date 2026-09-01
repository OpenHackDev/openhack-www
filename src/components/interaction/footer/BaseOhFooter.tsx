import Terminal from "@/icons/terminal.svg";
import { ColumnLayout } from "../layout/ColumnLayout";
import { RowLayout } from "../layout/RowLayout";

export function BaseOhFooter({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-stretch justify-start min-h-50 bg-gray-200 border-t-4 border-black text-2xl text-gray-800 p-2 bottom-0 relative w-full ${className}`}
    >
      <RowLayout className="justify-center gap-20">
        <div className="flex items-center min-w-35">
          <div className="w-16 h-16 border-6 mr-2 text-base">
            <Terminal className="w-12 h-12 text-gray-800" />
          </div>
          <span className="text-3xl">
            open<strong>hack</strong>
          </span>
        </div>
        <RowLayout className="flex-0! gap-8">
          <ColumnLayout>
            <span className="font-bold mb-1">Resources</span>
            <a
              href="/documentation"
              className="text-sm text-gray-700 hover:underline"
            >
              Documentation
            </a>
          </ColumnLayout>
          <ColumnLayout>
            <span className="font-bold mb-1">Notices</span>
            <a
              href="/notices/gdpr"
              className="text-sm text-gray-700 hover:underline"
            >
              GDPR
            </a>
          </ColumnLayout>
          <ColumnLayout>
            <span className="font-bold mb-1">Contact</span>
            <span className="text-sm text-gray-700">[email]</span>
          </ColumnLayout>
        </RowLayout>
      </RowLayout>
    </div>
  );
}
