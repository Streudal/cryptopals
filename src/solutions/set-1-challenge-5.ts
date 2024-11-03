export const englishInput = "Burning 'em, if you ain't quick and nimble\nI go crazy when I hear a cymbal";
export const encryptionKey = "ICE";
export const expectedOutput = "0b3637272a2b2e63622c2e69692a23693a2a3c6324202d623d63343c2a26226324272765272a282b2f20430a652e2c652a3124333a653e2b2027630c692b20283165286326302e27282f";

export function repeatingKeyXOR(plaintext: string, key: string) {
  let ciphertext: string[] = [];
  let keyLength = key.length;

  for (let i = 0; i < plaintext.length; i++) {
    // XOR each character's byte value with the key's corresponding byte value
    let xorByte = plaintext.charCodeAt(i) ^ key.charCodeAt(i % keyLength);
    // Convert the result to a two-character hexadecimal string
    ciphertext.push(xorByte.toString(16).padStart(2, "0"));
  }

  // Join all hex values into a single string
  return ciphertext.join("");
}

console.log(repeatingKeyXOR(englishInput, encryptionKey) === expectedOutput); // true
