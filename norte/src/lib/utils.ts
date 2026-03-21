import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prepend basePath to local asset paths (e.g. /images/foo.jpg → /norte/images/foo.jpg). */
export function imgSrc(path: string): string {
  if (!path || path.startsWith("http")) return path;
  return `${BASE_PATH}${path}`;
}
