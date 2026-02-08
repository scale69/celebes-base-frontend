import NewsHeader from "@/components/articles/NewsHeader";
import AdBanner from "@/components/layout/AdBanner";

export default function ArticleLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {


    return (
        <div>
            {children}
        </div>
    );
}
