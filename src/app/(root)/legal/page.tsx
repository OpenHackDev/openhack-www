import Link from "next/link";

export default function() {
    return (
        <div className="p-2">
            <h1 className="text-2xl">Links</h1>
            <ul className="underline">
                <li><Link href="/legal/gdpr">GDPR</Link></li>
            </ul>
        </div>
    )
}