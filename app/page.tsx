"use server"
import Home from "@/components/articles/Home";
import LoadingCard from "@/components/layout/LoadingCard";
import { fetchArticleByCategoryName, fetchArticles } from "@/lib/axios/action/article";
import { Suspense } from "react";

export default async function Page() {
    const categories = ["SULTRA", "Ekonomi", "Olahraga"];
    // const start = Date.now();
    const [initialData, getData] = await Promise.all([
        Promise.all(categories.map((c) => fetchArticleByCategoryName(c))),
        fetchArticles()
    ]);
    // console.log('fetchArticles + categories duration:', Date.now() - start, 'ms')
    return (
        <Suspense fallback={<LoadingCard />} >
            <Home {...{ getData, initialData, categories }} />
        </Suspense>
    )

}