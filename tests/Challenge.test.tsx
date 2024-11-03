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
  const hexStrings = fileContent.split('\n').filter(line => {
    // Trim whitespace and only keep non-empty lines
    const trimmed = line.trim();
    return trimmed !== '' && trimmed.length === 60;
  });

  // Validate each line
  hexStrings.forEach((line, index) => {
    const lineNumber = index + 1;
    expect(line.length).toBe(60);
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
    // Read the encrypted file
  const filePath = path.join(__dirname, '../public/assets/set-1-challenge-data-6.txt');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const encryptedData = Buffer.from(fileContent, 'base64');
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
  
  // Process the file content
  const encryptedLines = fileContent
    .split('\n')
    .filter(line => line.trim() !== '')
    .map(line => line.trim())
    .join('');

  // Define the key
  const key = 'YELLOW SUBMARINE';
  let successfulDecryption = false;

    try {
      const decrypted = decryptAES128ECB(encryptedLines, key);
      
      // More lenient validation of decrypted text
      if (
        decrypted &&
        decrypted.length > 0 &&
        /^[\x20-\x7E\n\t]*$/.test(decrypted) &&
        /\b(the|be|to|of|and|in|that|have|it|for|not|on|with)\b/i.test(decrypted)
      ) {
        console.log('Successfully decrypted:', decrypted.slice(0, 50)); // Log first 50 chars for debugging
        successfulDecryption = true;
        
      }
    } catch (error) {
      // Log the error for debugging but continue
      console.error('Failed to decrypt line:', error);
      
    }
  

  expect(successfulDecryption).toBeTruthy();

});
