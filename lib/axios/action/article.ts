"use server";

import axiosInstance from "../instance";

export async function fetchArticles() {
  const instance = axiosInstance();
  try {
    const res = await instance.get(`articles/`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message); // Memperbaiki akses pesan kesalahan
    } else {
      console.log("An unknown error occurred"); // Menangani kesalahan yang tidak terduga
    }
    return null;
  }
}

export async function fetchArticleBySlug(slug: string) {
  const instance = axiosInstance();
  try {
    const res = await instance.get(`articles/${slug}`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message); // Memperbaiki akses pesan kesalahan
    } else {
      console.log("An unknown error occurred"); // Menangani kesalahan yang tidak terduga
    }
    return null;
  }
}
export async function fetchArticleByCategorySlug(slug: string) {
  const instance = axiosInstance();
  try {
    const res = await instance.get(`articles/?category_slug=${slug}`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message); // Memperbaiki akses pesan kesalahan
    } else {
      console.log("An unknown error occurred"); // Menangani kesalahan yang tidak terduga
    }
    return null;
  }
}
