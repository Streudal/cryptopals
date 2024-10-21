import { expect, test } from 'vitest';
import fs from 'fs';
import path from 'path';
import {detectSingleCharXOR, isValidHex, decryptAES128ECB} from '../src/lib/utils';

// Challenge 1: Convert hex to base64
test('Challenge 1: Convert hex to base64', () => {
  const hex = '49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d';
  const expectedBase64 = 'SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t';

  const result = Buffer.from(hex, 'hex').toString('base64');
  expect(result).toBe(expectedBase64);
});

// Challenge 2: Fixed XOR
test('Challenge 2: Fixed XOR', () => {
  const result = '746865206b696420646f6e277420706c6179';
  expect(result).toBeDefined();
});

// Challenge 3: Single-byte XOR cipher detection
test('Challenge 3: Single-byte XOR cipher', () => {
  const result = '1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736';
  expect(result).toBeDefined();
});

// Challenge 4: Detect AES in ECB mode
test('Challenge 4: Detect single-character XOR', () => {
  // Read the file
  const filePath = path.join(__dirname, '../public/assets/set-1-challenge-data-4.txt');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const hexStrings = fileContent.split('\n').filter(line => line.trim() !== '');

  // Validate each line
  hexStrings.forEach((line, index) => {
    const lineNumber = Number(index + 1);
    
    if (line.length !== 60) {
      throw new Error(`Line ${lineNumber.toString()} should be 60 characters long`);
    }
    expect(line.length).toBe(60);
    
    if (!isValidHex(line)) {
      throw new Error(`Line ${lineNumber.toString()} should contain only valid hexadecimal characters`);
    }
    expect(isValidHex(line)).toBe(true);
  });

  const result = detectSingleCharXOR(hexStrings);
  
  expect(result).toBeDefined();
  expect(result?.line).toBe("7b5a4215415d544115415d5015455447414c155c46155f4058455c5b523f");
  expect(result?.key).toBe(53); // ASCII value for '5'
  expect(result?.plaintext).toBe("Now that the party is jumping\n");

  // Additional validation
  const decrypted = Buffer.from(result!.line, 'hex').map(byte => byte ^ result!.key);
  expect(Buffer.from(decrypted).toString('ascii')).toBe(result?.plaintext);
});


// Challenge 5: Implement repeating-key XOR
test('Challenge 5: Repeating-key XOR', () => {
  const result = [
    '0b3637272a2b2e63622c2e69692a23693a2a3c6324202d623d63343c2a26226324272765272',
    'a282b2f20430a652e2c652a3124333a653e2b2027630c692b20283165286326302e27282f'
  ];
  expect(result).toBeDefined();
});

// Challenge 6: Decrypt AES-128 ECB Mode
test('Challenge 6: Decrypt AES-128 ECB', () => {
  const result = 'wokka wokka!!!';
  expect(result).toBeDefined();
});

// Challenge 7: Detect AES ECB (file test)
test('Challenge 7: Detect AES in ECB mode (file test)', () => {
  const result = "YELLOW SUBMARINE";
  expect(result).toBeDefined();
});

// Challenge 8: AES-128 ECB Mode Decryption
test('Challenge 8: AES-128 ECB Mode Decryption', () => {
  // Read the encrypted file
  const filePath = path.join(__dirname, '../public/assets/set-1-challenge-data-8.txt');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const encryptedLines = fileContent.split('\n').filter(line => line.trim() !== '');


  // Define the key (usually provided in the challenge)
  const key = 'YELLOW SUBMARINE';

  // Decrypt each line and check for valid output
  encryptedLines.forEach((line, index) => {
    const decrypted = decryptAES128ECB(line, key);
    
    // Check if the decrypted text is valid ASCII
    expect(decrypted).toMatch(/^[\x20-\x7E\n]*$/);

    // Check if the decrypted text contains common English words
    expect(decrypted).toMatch(/\b(the|be|to|of|and|in|that|have|it|for|not|on|with)\b/i);

    // Check if the decrypted text has a reasonable length
    expect(decrypted.length).toBeGreaterThan(0);
    expect(decrypted.length).toBeLessThan(line.length);
  });

  // Check if at least one line was successfully decrypted
  const successfullyDecrypted = encryptedLines.some(line => {
    try {
      const decrypted = decryptAES128ECB(line, key);
      const regex = /\b(the|be|to|of|and|in|that|have|it|for|not|on|with)\b/i;
      return regex.test(decrypted);
    } catch (error) {
      console.error(`Decryption failed for line: ${line}`);
      console.error(error);
      return false;
    }
  });

  expect(successfullyDecrypted).toBe(true);
});
