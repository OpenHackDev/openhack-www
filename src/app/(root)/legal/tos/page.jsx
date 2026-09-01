import { MarkdownDocument } from "@/components/documentation/MarkdownDocument";
import tos from './tos.md'

export const metadata = {
    title: "Terms Of Service - OpenHack"
}

export default function() {
    return (
        <div className="p-2 pl-4 pr-4">
            <div>
                <h1 className="text-4xl"><b>Terms Of Service (TOS)</b></h1>
                <div className="text-gray-400"><i>
                    <h2>Last revised: 01/09/2026</h2>
                    <h2>Revised by: Ikechukwu</h2>
                </i></div>
            </div>
            <hr className="bg-oh-blue w-full h-1 mx-auto my-4 border-0 md:my-5"/>
            <MarkdownDocument content={tos} />
        </div>
    )
}