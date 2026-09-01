import Link from "next/link";

export default function() {
    return (
        <div className="p-2">
            <h1 className="text-2xl">Links</h1>
            <ul className="underline">
                <li><Link href="/legal/tos">Terms Of Service</Link></li>
                <li><Link href="/legal/gdpr">GDPR</Link></li>
                <li><Link href="/legal/privacy">Privacy</Link></li>
                <li><Link href="/legal/cookies">Cookies</Link></li>
            </ul>
        </div>
    )
}