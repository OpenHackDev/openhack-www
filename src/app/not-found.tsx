import { BaseOhHeader } from '@/components/interaction/header/BaseOhHeader';
import { ColumnLayout } from '@/components/interaction/layout/ColumnLayout';
import Link from 'next/link'

import { quotes } from './quotes.json'
import { Header } from '@/components/interaction/text/Header';
import { Button } from '@/components/interaction/button/BorderedButton';

// TODO make it look nice
 
export default function NotFound() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)]

    return (
        <ColumnLayout className="">
            <BaseOhHeader/>
            <div className="relative p-2 h-auto w-full flex flex-col items-center justify-center">
                <h1 className="text-2xl"><b>404</b></h1>
                <h2 className="text-"><b>Page Not Found</b></h2>
                <h2>Hmmm, It seems that page doesn't exist right now.</h2>
                <Link className="underline" href="/">Return Home</Link>
                <div className="absolute flex flex-col top-40 items-center justify-center max-w-200 text-center">
                    <p>"{quote.quote}"</p>
                    <p>~ {quote.author}</p>
                </div>
            </div>
        </ColumnLayout>
    )
}