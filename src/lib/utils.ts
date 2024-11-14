import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const alterStringLength = (str: string, length: number) => {
  if (str.length > length) {
    return str.slice(0, length) + "...";
  }
  return str;
};