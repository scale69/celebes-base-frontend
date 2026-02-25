import { Ads } from "./data";

export interface AdBannerProps {
  size?: "inline" | "left sidebar" | "right sidebar" | "header";
  title?: string;
  className?: string;
}

export interface SlugProps {
  params: Promise<{ slug: string }>;
}
