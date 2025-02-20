import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export function parseShorthandDate(shorthand: string) {
   const now = new Date();
   const date = new Date(now);

   // Get the value and unit from the shorthand (e.g., "7d" -> 7 and "d")
   const value = parseInt(shorthand);

   // Define unit mappings
   const units = {
      s: { method: "setSeconds", value: now.getSeconds() - value },
      m: { method: "setMinutes", value: now.getMinutes() - value },
      h: { method: "setHours", value: now.getHours() - value },
      d: { method: "setDate", value: now.getDate() - value },
      w: { method: "setDate", value: now.getDate() - value * 7 },
      M: { method: "setMonth", value: now.getMonth() - value },
      y: { method: "setFullYear", value: now.getFullYear() - value },
   } as const;

   const unit = shorthand.slice(-1).toLowerCase() as keyof typeof units;
   if (!Object.keys(units).includes(unit)) {
      throw new Error(
         `Invalid time unit. Use ${Object.keys(units).join(", ")}`
      );
   }

   if (units[unit]) {
      date[units[unit].method](units[unit].value);
   } else {
      throw new Error("Invalid time unit. Use s, m, h, d, w, M, or y");
   }

   return getRelativeTimeString(date, now);
}

function getRelativeTimeString(date: Date, now: Date) {
   const diffTime = now.getTime() - date.getTime();
   const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
   const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
   const diffMinutes = Math.floor(diffTime / (1000 * 60));

   if (diffDays > 365) {
      const years = Math.floor(diffDays / 365);
      return `${years} year${years > 1 ? "s" : ""} ago`;
   } else if (diffDays > 30) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? "s" : ""} ago`;
   } else if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
   } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
   } else if (diffMinutes > 0) {
      return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
   } else {
      return "just now";
   }
}
