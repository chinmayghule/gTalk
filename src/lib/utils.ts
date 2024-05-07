import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import * as jose from "jose";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateHHMM(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
}

export function truncateText(text: string, maxLength: number) {
  if (text?.length > maxLength) {
    return text?.slice(0, maxLength) + "...";
  }
  return text;
}

export async function validateToken(token: string | undefined) {
  if (!token) return false;

  // validate token
  const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);

  const { payload } = await jose.jwtVerify(token, secretKey);

  return payload;
}
