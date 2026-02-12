"use server"
import Home from "@/components/articles/Home";
import { fetchArticleByCategoryName, fetchArticles } from "@/lib/axios/action/article";

export default async function Page() {
    const categories = ["SULTRA", "Ekonomi", "Olahraga"];
    // const start = Date.now();
    const [initialData, getData] = await Promise.all([
        Promise.all(categories.map((c) => fetchArticleByCategoryName(c))),
        fetchArticles()
    ]);
    // console.log('fetchArticles + categories duration:', Date.now() - start, 'ms')
    return (
        <Home getData={getData} initialData={initialData} categories={categories} />
    )

}