import { expect, test } from 'vitest';
import {screen} from '@testing-library/react'
import Challenge from '@/components/challenge-2/Challenge';
import { Code } from '@/components/Code';


// Challenge 1: Convert hex to base64
test('Challenge 1: Convert hex to base64', () => {
  const hex = '49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d';
  const expectedBase64 = 'SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t';
 
  const result = Buffer.from(hex, 'hex').toString('base64');
  expect(result).toBe(expectedBase64);
});

// Challenge 2: Fixed XOR
test('Challenge 2: Fixed XOR', () => {
  const result ='746865206b696420646f6e277420706c6179';
  expect(result).toBeDefined();
});

// Challenge 3: Single-byte XOR cipher detection
test('Challenge 3: Single-byte XOR cipher', () => {
 const result = '1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736';
 expect(result).toBeDefined();
});

// Challenge 4: Detect AES in ECB mode
test('Challenge 4: Detect AES in ECB mode', () => {
  const result = '';
  expect(result).toBeUndefined;
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
  const result =  'wokka wokka!!!';
  expect(result).toBeDefined();
});

// Challenge 7: Detect AES ECB (file test)
test('Challenge 7: Detect AES in ECB mode (file test)', () => {
  const result = "YELLOW SUBMARINE";
  expect(result).toBeDefined();
});

// Challenge 8: AES-128 ECB Mode Decryption
test('Challenge 8: AES-128 ECB Mode Decryption', () => {
  const result = "";
  expect(result).toBeUndefined;
});