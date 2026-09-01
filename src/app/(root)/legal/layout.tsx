import { BaseOhHeader } from "@/components/interaction/header/BaseOhHeader";

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