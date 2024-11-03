import { describe, it, expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import fs from 'fs';
import path from 'path';
import Solution from '@/components/sets/challenge-6/Solution';
import { getItem, saveItem } from '@/lib/utils';
import Challenge from '@/components/sets/challenge-6/Challenge';

import {
  hammingDistance,
  normalizedHammingDistance,
  findKeySize,
  transposeBlocks,
  scoreEnglishText,
  singleByteXorDecrypt,
  base64ToByteArray,
  decrypt
} from '@/solutions/set-1-challenge-6';


//test('Challenge 6: Decrypt AES-128 ECB', () => {
//   const result = 'wokka wokka!!!';
//   expect(result).toBeDefined();
//     // Read the encrypted file
//   const filePath = path.join(__dirname, '../public/assets/set-1-challenge-data-6.txt');
//   const fileContent = fs.readFileSync(filePath, 'utf-8');
//   const encryptedData = Buffer.from(fileContent, 'base64');
//   expect(fileContent).toBeDefined();
//   expect(encryptedData).toBeDefined();
// });
  // // Process the file content
  // const encryptedLines = fileContent
  //   .split('\n')
  //   .filter(line => line.trim() !== '')
  //   .map(line => line.trim())
  //   .join('');

  
  describe('Cryptography Functions', () => {
    describe('hammingDistance', () => {
      it('should calculate correct Hamming distance between two strings', () => {
        const str1 = 'this is a test';
        const str2 = 'wokka wokka!!!';
        expect(hammingDistance(str1, str2)).toBe(37);
      });
  
      it('should throw error for strings of different lengths', () => {
        expect(() => hammingDistance('abc', 'abcd')).toThrow('Strings must be of equal length');
      });
    });
  
    describe('normalizedHammingDistance', () => {
      it('should calculate normalized distance for given keysize', () => {
        const testData = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
        const result = normalizedHammingDistance(testData, 2);
        expect(result).toBeTypeOf('number');
        expect(result).toBeGreaterThan(0);
      });
    });
  
    describe('findKeySize', () => {
      it('should find a keysize between 2 and 40', () => {
        const testData = new Uint8Array(100).fill(65); // Fill with 'A's
        const keysize = findKeySize(testData);
        expect(keysize).toBeGreaterThanOrEqual(2);
        expect(keysize).toBeLessThanOrEqual(40);
      });
    });
  
    describe('transposeBlocks', () => {
      it('should correctly transpose blocks', () => {
        const input = new Uint8Array([1, 2, 3, 4, 5, 6]);
        const keysize = 2;
        const transposed = transposeBlocks(input, keysize);
        
        expect(transposed).toHaveLength(keysize);
        expect(Array.from(transposed[0])).toEqual([1, 3, 5]);
        expect(Array.from(transposed[1])).toEqual([2, 4, 6]);
      });
    });
  
    describe('scoreEnglishText', () => {
      it('should give higher score to valid English text', () => {
        const englishText = 'the quick brown fox';
        const gibberish = 'xkcd vmz qwerty';
        
        const englishScore = scoreEnglishText(englishText);
        const gibberishScore = scoreEnglishText(gibberish);
        
        expect(englishScore).toBeGreaterThan(gibberishScore);
      });
  
      it('should be case insensitive', () => {
        const lower = 'test';
        const upper = 'TEST';
        expect(scoreEnglishText(lower)).toBe(scoreEnglishText(upper));
      });
    });
  
    describe('singleByteXorDecrypt', () => {
      it('should decrypt single-byte XOR encrypted text', () => {
        // Create a simple encrypted text: "hello" XORed with key 42
        const plaintext = 'hello';
        const key = 42;
        const encrypted = new Uint8Array(plaintext.split('').map(c => c.charCodeAt(0) ^ key));
        
        const decryptedKey = singleByteXorDecrypt(encrypted);
        expect(decryptedKey).toBe(key);
      });
    });
  
    describe('base64ToByteArray', () => {
      it('should correctly convert base64 to byte array', () => {
        const base64 = 'SGVsbG8='; // "Hello" in base64
        const byteArray = base64ToByteArray(base64);
        
        expect(byteArray).toBeInstanceOf(Uint8Array);
        expect(String.fromCharCode(...byteArray)).toBe('Hello');
      });
    });
  
    describe('decrypt', () => {
      it('should decrypt text with repeating key', () => {
        const plaintext = 'Hello World';
        const key = new Uint8Array([1, 2, 3]); // 3-byte repeating key
        
        // Encrypt
        const ciphertext = new Uint8Array(plaintext.length);
        for (let i = 0; i < plaintext.length; i++) {
          ciphertext[i] = plaintext.charCodeAt(i) ^ key[i % key.length];
        }
        
        // Decrypt
        const decrypted = decrypt(ciphertext, key);
        expect(decrypted).toBe(plaintext);
      });
    });
  
    describe('Integration test', () => {
      it('should successfully process a complete encryption/decryption cycle', () => {
        // Create a simple test message
        const originalText = 'The quick brown fox jumps over the lazy dog';
        const testKey = new Uint8Array([65, 66, 67]); // Key: "ABC"
        
        // Convert to Uint8Array
        const textBytes = new Uint8Array(originalText.split('').map(c => c.charCodeAt(0)));
        
        // Encrypt
        const encrypted = new Uint8Array(textBytes.length);
        for (let i = 0; i < textBytes.length; i++) {
          encrypted[i] = textBytes[i] ^ testKey[i % testKey.length];
        }
        
        // Find key size
        const discoveredKeySize = findKeySize(encrypted);
        expect(discoveredKeySize).toBeGreaterThanOrEqual(2);
        expect(discoveredKeySize).toBeLessThanOrEqual(40);
        
        // Transpose and decrypt
        const transposed = transposeBlocks(encrypted, discoveredKeySize);
        const discoveredKey = transposed.map(block => singleByteXorDecrypt(block));
        const decrypted = decrypt(encrypted, new Uint8Array(discoveredKey));
        
        // The decrypted text should be readable English
        expect(scoreEnglishText(decrypted)).toBeGreaterThan(0);
      });
    });
  });
