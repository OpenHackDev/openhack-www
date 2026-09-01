import { BaseOhHeader } from "@/components/interaction/header/BaseOhHeader";

export const metadata = {
    title: "Legal - OpenHack"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <div className="flex-1 flex flex-col">
            <BaseOhHeader/>        
            {children}
        </div>
    );
}