"use server";

import axiosInstance from "../instance";

export async function fetchAds(placement: string, target_url: string) {
  const instance = axiosInstance();
  try {
    const res = await instance.get(
      `/api/ads/?status=true&placement=${placement}&target_url=${target_url}`,
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
