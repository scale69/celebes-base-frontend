import CategoryPageTemplate from "@/components/articles/CategoryPageTemplate";
import { SlugProps } from "@/types/props";

export default async function Page({ params }: SlugProps) {

    return (
        <CategoryPageTemplate />
    )
}