import Terminal from "@/icons/terminal.svg";
import { ColumnLayout } from "../layout/ColumnLayout";
import { RowLayout } from "../layout/RowLayout";

export function BaseOhFooter({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-stretch justify-start min-h-50 bg-gray-200 border-t-4 border-black text-2xl text-gray-800 p-2 bottom-0 relative w-full ${className}`}
    >
      <RowLayout className="justify-center gap-20 whitespace-nowrap">
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
            <span className="font-bold mb-1"><a href="/legal">Legal</a></span>
            <a href="/legal/tos" className="text-sm text-gray-700 hover:underline">
              Terms Of Service
            </a>
            <a href="/legal/gdpr" className="text-sm text-gray-700 hover:underline">
              GDPR
            </a>
            <a href="/legal/privacy" className="text-sm text-gray-700 hover:underline">
              Privacy
            </a>
            <a href="/legal/cookies" className="text-sm text-gray-700 hover:underline">
              Cookies
            </a>
          </ColumnLayout>
          <ColumnLayout>
            <span className="font-bold mb-1">Contact</span>
            <a href="mailto:hello@openhack.dev" className="text-sm text-gray-700">Email us</a>
          </ColumnLayout>
          <ColumnLayout>
            <span className="font-bold mb-1"><a href="/legal">Socials</a></span>
            <a href="https://github.com/OpenHackDev" className="text-sm text-gray-700 hover:underline">
              Github
            </a>
          </ColumnLayout>
        </RowLayout>
      </RowLayout>
    </div>
  );
}
