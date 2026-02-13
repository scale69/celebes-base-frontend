import NewsHeader from "@/components/articles/NewsHeader";
type PageProps = {
    params: { slug: string };
    searchParams: Record<string, string | string[] | undefined>;
};
export default function Page({ params, searchParams }: PageProps) {

    return (
        <NewsHeader />
    )
}