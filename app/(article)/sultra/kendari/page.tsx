import CategoryPageTemplate from "@/components/articles/CategoryPageTemplate";
import { SlugProps } from "@/types/props";

export default function Page({ params }: SlugProps) {

    return (
        <CategoryPageTemplate params={params} />
    )
}