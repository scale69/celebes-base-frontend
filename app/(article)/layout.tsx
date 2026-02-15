import ReactQueryProvider from "@/lib/ReactQueryProvider"

export const dynamic = "force-dynamic";

export default function ArticleLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ReactQueryProvider>
            {children}
        </ReactQueryProvider>
    )

}
