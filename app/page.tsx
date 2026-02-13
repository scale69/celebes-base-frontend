"use server"
import Home from "@/components/articles/Home";
import LoadingCard from "@/components/layout/LoadingCard";
import { fetchArticleByCategoryName, fetchArticles } from "@/lib/axios/action/article";
import { Suspense } from "react";

export default async function Page() {
    // const start = Date.now();
    const getData = fetchArticles()
    // console.log('fetchArticles + categories duration:', Date.now() - start, 'ms')
    return (
        <Suspense fallback={<LoadingCard />} >
            <Home {...{ getData }} />
        </Suspense>
    )

}