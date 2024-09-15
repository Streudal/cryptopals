import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Save/update item to local storage.
 */
export function saveItem(key: 'cat' | 'dog', value: string) {
  return localStorage.setItem(key, value);
}


/**
 * Get item value from local storage.
 */
export function getItem(key: string) {
  return localStorage.getItem(key);
}

/**
 * Remove item from local storage.
 */
export function removeItem(key: string) {
  return localStorage.removeItem(key);
}

/**
 * Clear all of local storage.
 */
export function clearItems() {
  return localStorage.clear();
}
