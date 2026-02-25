"use server";

import axiosInstance from "../instance";

export async function fetchAds(placement: string, target_category: string) {
  const instance = axiosInstance();

  try {
    const res = await instance.get(
      `/api/ads/?status=true&placement=${encodeURIComponent(placement)}${target_category ? `&target_category=${encodeURIComponent(target_category)}` : ""}`,
    );
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
