import { Button } from "@/components/interaction/button/BorderedButton";
import { BaseOhHeader } from "@/components/interaction/header/BaseOhHeader";
import { Header } from "@/components/interaction/text/Header";
import { BorderedContainer } from "@/components/structure/container/BorderedContainer";
import Link from "next/link";

export default function() {
    return (
        <div className="min-h-screen">
            <BaseOhHeader/>
            <div className="absolute h-[calc(100vh-52px)] w-full p-2 flex grow flex-1">
                <BorderedContainer className="w-full flex flex-col items-center justify-center">
                    <h1 className="text-3xl"><b>Coming soon</b></h1>
                    <hr className="bg-oh-blue w-100 h-1 mx-auto my-4 border-0 md:my-5"/>
                    <div className="pt-2">
                        <div className="flex flex-1 flex-row gap-2">
                            <a rel="stylesheet" href="mailto:hello@openhack.dev?subject=Register%20for%20OpenHack" className="
                                bg-oh-red
                                border-oh-red
                                text-white
                                flex
                                flex-col
                                items-center
                                justify-center
                                h-7.5 w-max
                                p-2
                                border-4
                                shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                                active:translate-y-0.5
                                active:shadow-[2px_1px_0px_0px_rgba(0,0,0,1)]"
                            >
                                Register interest
                            </a>
                            <span className="mt-1">•</span>
                            <a rel="stylesheet" href="https://app.openhack.dev/auth/login" className="
                                bg-oh-blue
                                border-oh-blue
                                text-white
                                flex
                                flex-col
                                items-center
                                justify-center
                                h-7.5 w-max
                                p-2
                                border-4
                                shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                                active:translate-y-0.5
                                active:shadow-[2px_1px_0px_0px_rgba(0,0,0,1)]"
                            >
                                Open the app
                            </a>
                        </div>
                    </div>
                </BorderedContainer>
            </div>
        </div>
    )
}