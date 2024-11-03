const hexCipherText = `
PASTE FILE CONTENTS HERE
`;

// Function to detect ECB encrypted ciphertext by checking for repeated 16-byte blocks
export function detectECBEncryptedCiphertexts(ciphertexts: string[]): number {
  for (let i = 0; i < ciphertexts.length; i++) {
    const hex = ciphertexts[i]!;
    const blocks = new Set();

    // Split the hex string into 16-byte blocks (32 hex characters)
    for (let j = 0; j < hex.length; j += 32) {
      const block = hex.slice(j, j + 32);

      // Check if the block is repeated
      if (blocks.has(block)) {
        return i; // Return the index of the ECB-encrypted ciphertext
      }

      blocks.add(block);
    }
  }

  return -1; // If no ECB encrypted ciphertext is found
}

export const hexCiphertexts = hexCipherText.split("\n"); // convert each line of the given ciphertext to an array so we can identify the index
export const ecbCiphertextIndex = detectECBEncryptedCiphertexts(hexCiphertexts);

if (ecbCiphertextIndex >= 0) {
  console.log(`ECB-encrypted ciphertext detected at:`);
  console.log(`  Index: ${ecbCiphertextIndex}`);
  console.log(`  Ciphertext: ${hexCiphertexts[ecbCiphertextIndex]}`);
} else {
  console.log("No ECB-encrypted ciphertext detected.");
}
