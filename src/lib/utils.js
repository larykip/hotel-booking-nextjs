import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names and removes duplicates.
 * @param {...string} inputs - The class names to merge.
 * @returns {string} The merged class names.
 */
export function cn(...inputs) {
	return twMerge(clsx(inputs));
}
