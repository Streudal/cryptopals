import * as crypto from "crypto"; // Use node crypto library

const encryptedBase64Content = `
PASTE FILE CONTENTS HERE
`;
export const decryptionKey = "YELLOW SUBMARINE";

/**
 * Create a decipher object with AES-128-ECB algorithm and the given key
 * Disable auto padding (since AES-128-ECB does not use padding by default)
 */
export function decryptAES128ECB(encryptedText: string, key: string): string {
  const decipher = crypto.createDecipheriv("aes-128-ecb", Buffer.from(key, "utf-8"), null);
  decipher.setAutoPadding(true);

  let decrypted = decipher.update(encryptedText, "base64", "utf-8");
  decrypted += decipher.final("utf-8");

  return decrypted;
}

export const decryptedMessage = decryptAES128ECB(encryptedBase64Content, decryptionKey);
console.log(decryptedMessage); // Vanilla Ice - Play That Funky Music Lyrics (again)
