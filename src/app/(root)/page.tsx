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
                    <h1 className="text-2xl"><b>Coming soon</b></h1>
                    <hr className="bg-oh-blue w-100 h-1 mx-auto my-4 bg-neutral-quaternary border-0 rounded-sm md:my-5"/>
                    <div className="pt-2">
                        <div className="flex flex-1 flex-row gap-2">
                            <Button className="bg-oh-blue border-oh-blue text-white">
                                <Link rel="stylesheet" href="mailto:hello@openhack.dev">
                                    Register interest
                                </Link>
                            </Button>
                            <span className="text-oh-blue mt-1">•</span>
                            <Link rel="stylesheet" href="https://app.openhack.dev/auth/login"><Button>Login</Button></Link>
                        </div>
                    </div>
                </BorderedContainer>
            </div>
        </div>
    )
}