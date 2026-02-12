import ReactQueryProvider from "@/lib/ReactQueryProvider"

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
