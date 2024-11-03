import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from 'crypto';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type StorageKey = string;

/**
 * Save/update item to local storage.
 */
export function saveItem(key: StorageKey, value: string) {
  return localStorage.setItem(key, value);
}

/**
 * Get item value from local storage.
 */
export function getItem(key: StorageKey) {
  return localStorage.getItem(key);
}

/**
 * Remove item from local storage.
 */
export function removeItem(key: StorageKey) {
  return localStorage.removeItem(key);
}

/**
 * Clear all of local storage.
 */
export function clearItems() {
  return localStorage.clear();
}

export function isValidHex(str: string): boolean{
  return /^[0-9A-Fa-f]+$/.test(str);
}

function scoreText(text: string): number {
  // Implement a simple scoring function
  return text.split('').filter(char => /[a-zA-Z ]/.test(char)).length;
}

export function detectSingleCharXOR(hexStrings: string[]): { plaintext: string; line: string; key: number } | null {
  let bestScore = 0;
  let bestResult = null;

  for (const line of hexStrings) {
    const bytes = Buffer.from(line, 'hex');
    for (let key = 0; key < 256; key++) {
      const decoded = bytes.map(byte => byte ^ key);
      const text = Buffer.from(decoded).toString('ascii');
      const score = scoreText(text);

      if (score > bestScore) {
        bestScore = score;
        bestResult = { plaintext: text, line, key };
      }
    }
  }

  return bestResult;
}

export function decryptAES128ECB(ciphertext: string, key: string): string {
  try {
    // Convert the key to a buffer of correct length
    const keyBuffer = Buffer.from(key, 'utf8');
    
    // Create decipher with ECB mode
    const decipher = crypto.createDecipheriv('aes-128-ecb', keyBuffer, null);
    decipher.setAutoPadding(true);

    // Join lines and remove whitespace
    const cleanCiphertext = ciphertext.replace(/\s+/g, '');
    
    // Decrypt the data
    let decrypted = decipher.update(Buffer.from(cleanCiphertext, 'hex'));
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString('utf8');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Decryption error:', error.message);
    }
    throw error;
  }
}
