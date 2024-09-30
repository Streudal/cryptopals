import { expect, test } from 'vitest';


// Challenge 1: Convert hex to base64
test('Challenge 1: Convert hex to base64', () => {
  const hex = '49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d';
  const expectedBase64 = 'SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t';
 
  const result = Buffer.from(hex, 'hex').toString('base64');
  expect(result).toBe(expectedBase64);
});

// Challenge 2: Fixed XOR
test('Challenge 2: Fixed XOR', () => {
  // const buffer1 = Buffer.from('1c0111001f010100061a024b53535009181c', 'hex');
  // const buffer2 = Buffer.from('686974207468652062756c6c277320657965', 'hex');
  // const expectedXOR = '746865206b696420646f6e277420706c6179';
  // const result = fixedXOR(buffer1, buffer2).toString('hex');
  // expect(result).toBe(expectedXOR);
});

// Challenge 3: Single-byte XOR cipher detection
test('Challenge 3: Single-byte XOR cipher', () => {
  // const ciphertext = '1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736';
  // const result = detectSingleByteXOR(Buffer.from(ciphertext, 'hex'));
  // expect(result.key).toBeTruthy();  // Ensure a key is found
  // expect(result.decrypted).toContain('the');  // Ensure some meaningful text is found in the output
});

// Challenge 4: Detect AES in ECB mode
test('Challenge 4: Detect AES in ECB mode', () => {
  // const hexCiphertexts = [
  //   '6e0c23f5d87687291baf5729d67666d8',  // Random sample data
  //   'f57d75e92c209d576b206f7d11d6ed23',
  //   'd0cfd9f1d0cf06fcedecfbd9c80600c5',
  //   'd8df7a3fa809e54163b2f07d8df7a3fa',  // Repeated block (ECB encrypted)
  // ];
  // const ecbCiphertext = detectECB(hexCiphertexts);
  // expect(ecbCiphertext).toBe('d8df7a3fa809e54163b2f07d8df7a3fa');  // The ciphertext with repeated blocks
});

// Challenge 5: Implement repeating-key XOR
test('Challenge 5: Repeating-key XOR', () => {
  // const plaintext = "Burning 'em, if you ain't quick and nimble\nI go crazy when I hear a cymbal";
  // const key = 'ICE';
  // const expectedCiphertext = '0b3637272a2b2e63622c2e69692a23693a2a3c6324202d623d63343c2a26226324272765272a282b2f20430a652e2c652a3124333a653e2b2027630c692b20283165286326302e27282f';
  // const result = repeatingKeyXOR(plaintext, key).toString('hex');
  // expect(result).toBe(expectedCiphertext);
});

// Challenge 6: Decrypt AES-128 ECB Mode
test('Challenge 6: Decrypt AES-128 ECB', () => {
  // const base64Ciphertext = 'your-base64-encoded-string-here';  // Replace with actual ciphertext
  // const key = 'YELLOW SUBMARINE';
 
  // const result = decryptAES128ECB(base64Ciphertext, key);
  // expect(result).toContain('expected decrypted content');  // Adjust according to expected result
});

// Challenge 7: Detect AES ECB (file test)
test('Challenge 7: Detect AES in ECB mode (file test)', () => {
  // const hexCiphertexts = [
  //   // Add the actual hex-encoded data from the provided file
  // ];
  // const ecbCiphertext = detectECB(hexCiphertexts);
  // expect(ecbCiphertext).not.toBeNull();  // Ensure ECB encrypted ciphertext is found
});

// Challenge 8: AES-128 ECB Mode Decryption
test('Challenge 8: AES-128 ECB Mode Decryption', () => {
  // const base64Ciphertext = 'base64-content-of-file';  // Provide the actual Base64-encoded content
  // const key = 'YELLOW SUBMARINE';
  // const result = decryptAES128ECB(base64Ciphertext, key);
  // expect(result).toContain('expected plaintext');  // Compare with known result
});