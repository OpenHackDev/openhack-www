import { MarkdownDocument } from "@/components/documentation/MarkdownDocument";
import cookies from '@/app/(root)/legal/cookies/cookies.md'

export const metadata = {
    title: "Cookie Notice - OpenHack"
}

export default function() {
    return (
        <div className="p-2 pl-4 pr-4">
            <div>
                <h1 className="text-4xl"><b>Cookies</b></h1>
                <div className="text-gray-400"><i>
                    <h2>Last revised: 01/09/2026</h2>
                    <h2>Revised by: Ikechukwu</h2>
                </i></div>
            </div>
            <hr className="bg-oh-blue w-full h-1 mx-auto my-4 bg-neutral-quaternary border-0 rounded-sm md:my-5"/>
            <MarkdownDocument content={cookies} />
        </div>
    )
}