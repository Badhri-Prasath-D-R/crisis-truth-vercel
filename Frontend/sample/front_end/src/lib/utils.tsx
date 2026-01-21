import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function used by shadcn/ui
 * Safely merges Tailwind class names
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs))
}
