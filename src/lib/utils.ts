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

export function decryptAES128ECB(encryptedHex: string, key: string): string {
  // Convert the hex string to a buffer
  const encryptedBuffer = Buffer.from(encryptedHex, 'hex');

  // Create a decipher using AES-128-ECB
  const decipher = crypto.createDecipheriv('aes-128-ecb', key, null);

  // Disable automatic padding
  decipher.setAutoPadding(false);

  // Decrypt the buffer
  let decrypted = decipher.update(encryptedBuffer);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  // Remove PKCS#7 padding
  const paddingLength = decrypted[decrypted.length - 1];
  if (paddingLength === undefined || paddingLength > 16) {
    throw new Error('Invalid padding');
  }
  const unpaddedDecrypted = decrypted.slice(0, decrypted.length - paddingLength);

  // Convert the decrypted buffer to a string
  return unpaddedDecrypted.toString('utf8');
}
