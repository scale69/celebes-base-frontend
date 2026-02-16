"use server";

import { cache } from "react";
import axiosInstance from "../instance";

// Wrap dengan cache untuk request deduplication
export const fetchArticles = cache(async () => {
  const instance = axiosInstance();
  try {
    const res = await instance.get(`/api/articles/`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message); // Memperbaiki akses pesan kesalahan
    } else {
      console.log("An unknown error occurred"); // Menangani kesalahan yang tidak terduga
    }
    return null;
  }
});

export async function fetchArticleByOrdering(ordering: string) {
  const instance = axiosInstance();
  try {
    const res = await instance.get(`/api/articles/?ordering=${ordering}`);
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
// Wrap dengan cache untuk request deduplication
export const fetchArticleByTopOrPopulare = cache(async (field: string) => {
  const instance = axiosInstance();
  try {
    const res = await instance.get(`/api/articles/?${field}=true`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message); // Memperbaiki akses pesan kesalahan
    } else {
      console.log("An unknown error occurred"); // Menangani kesalahan yang tidak terduga
    }
    return null;
  }
});

// Wrap dengan cache untuk request deduplication - mencegah duplicate request dalam 1 render
export const fetchArticleBySlug = cache(async (slug: string) => {
  const instance = axiosInstance();
  try {
    const res = await instance.get(`/api/articles/${slug}`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message); // Memperbaiki akses pesan kesalahan
    } else {
      console.log("An unknown error occurred"); // Menangani kesalahan yang tidak terduga
    }
    return null;
  }
});

export const fetchArticleByCategoryName = cache(async (slug: string) => {
  const instance = axiosInstance();
  try {
    const res = await instance.get(`/api/articles/?category=${slug}`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message); // Memperbaiki akses pesan kesalahan
    } else {
      console.log("An unknown error occurred"); // Menangani kesalahan yang tidak terduga
    }
    return null;
  }
});
export async function fetchArticleByCategorySlug(slug: string) {
  const instance = axiosInstance();
  try {
    const res = await instance.get(`/api/articles/?category_slug=${slug}`);
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
// Wrap dengan cache untuk request deduplication
export const fetchArticleByRelated = cache(async (slug: string) => {
  const instance = axiosInstance();
  try {
    const res = await instance.get(`/api/articles/${slug}/related/`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message); // Memperbaiki akses pesan kesalahan
    } else {
      console.log("An unknown error occurred"); // Menangani kesalahan yang tidak terduga
    }
    return null;
  }
});

export const searchArticles = cache(async (query: string) => {
  const instance = axiosInstance();
  try {
    const res = await instance.get(`/api/articles/?search=${query}`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred");
    }
    return null;
  }
});

