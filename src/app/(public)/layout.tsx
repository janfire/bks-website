import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { incrementViews } from "@/lib/analytics";

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    incrementViews();

    return (
        <>
            <SiteHeader />
            {children}
            <SiteFooter />
        </>
    );
}
