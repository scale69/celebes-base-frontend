"use server";

import axiosInstance from "../instance";

export async function fetchArticles() {
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
}

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
export async function fetchArticleByTopOrPopulare(field: string) {
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
}
export async function fetchArticleBySlug(slug: string) {
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
}
export async function fetchArticleByCategoryName(slug: string) {
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
}
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
export async function fetchArticleByRelated(slug: string) {
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
}
