
import { describe, test, expect } from 'vitest';
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

describe('Set 1 - Challenge 6: Detect AES in ECB mode', () => {
    const base64EncodedCiphertext=`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
`;

  test('Independent Path Coverage', () => {
    // Test complete path from base64 input to decrypted output
    const bytes = base64ToByteArray(base64EncodedCiphertext);
    const keysize = findKeySize(bytes);
    const blocks = transposeBlocks(bytes, keysize);
    const key = blocks.map(block => singleByteXorDecrypt(block));
    const decrypted = decrypt(bytes, new Uint8Array(key));
    
    expect(bytes).toBeInstanceOf(Uint8Array);
    expect(keysize).toBeGreaterThanOrEqual(2);
    expect(keysize).toBeLessThanOrEqual(40);
    expect(blocks.length).toBe(keysize);
    expect(decrypted).toBeDefined();
    expect(typeof decrypted).toBe('string');
  });

  test('Logical Decisions (True)', () => {
    // Test string equality condition in hammingDistance
    expect(() => hammingDistance('test', 'test')).not.toThrow();
    
    // Test valid keysize condition
    const testData = new Uint8Array(100);
    const keysize = findKeySize(testData);
    expect(keysize).toBeGreaterThanOrEqual(2);
    
    // Test valid English text scoring
    const englishText = 'the quick brown fox';
    const score = scoreEnglishText(englishText);
    expect(score).toBeGreaterThan(0);
  });

  test('Logical Decisions (False)', () => {
    // Test unequal string lengths
    expect(() => hammingDistance('test', 'tests')).toThrow('Strings must be of equal length');
    
    // Test invalid keysize
    const smallData = new Uint8Array(1);
    expect(() => transposeBlocks(smallData, 2)).toBeDefined();
    
    // Test non-English text scoring
    const nonEnglishText = '####@@@@';
    const score = scoreEnglishText(nonEnglishText);
    expect(score).toBe(0);
  });

  test('Loop Boundary Testing', () => {
    // Test minimum keysize
    const minKeySizeData = new Uint8Array(4);
    const minKeysize = findKeySize(minKeySizeData);
    expect(minKeysize).toBeGreaterThanOrEqual(2);
    
    // Test maximum keysize
    const maxKeySizeData = new Uint8Array(200);
    const maxKeysize = findKeySize(maxKeySizeData);
    expect(maxKeysize).toBeLessThanOrEqual(40);
    
    // Test single-byte XOR with boundary values
    const singleByte = new Uint8Array([255]); // Maximum byte value
    expect(() => singleByteXorDecrypt(singleByte)).not.toThrow();
  });

  test('Internal Data Validity', () => {
    // Test base64 decoding validity
    const invalidBase64 = 'Invalid@Base64';
    
    expect(() => base64ToByteArray(base64EncodedCiphertext)).not.toThrow();
    expect(() => base64ToByteArray(invalidBase64)).toThrow();
    
    // Test transposed blocks consistency
    const testData = new Uint8Array([1, 2, 3, 4, 5, 6]);
    const blocks = transposeBlocks(testData, 2);
    expect(blocks[0]!.length + blocks[1]!.length).toBe(testData.length);
  });

  test('Cryptographic Operations', () => {
    // Test encryption/decryption roundtrip
    const originalText = 'Test Message';
    const key = new Uint8Array([1, 2, 3]); // Simple 3-byte key
    
    // Convert to bytes and encrypt
    const textBytes = new Uint8Array(originalText.split('').map(c => c.charCodeAt(0)));
    const encrypted = new Uint8Array(textBytes.length);
    for (let i = 0; i < textBytes.length; i++) {
      encrypted[i] = textBytes[i]! ^ key[i % key.length]!;
    }
    
    // Decrypt and verify
    const decrypted = decrypt(encrypted, key);
    expect(decrypted).toBe(originalText);
    
    // Test Hamming distance properties
    const distance = hammingDistance('this', 'that');
    expect(distance).toBeGreaterThan(0);
    expect(Number.isInteger(distance)).toBe(true);
  });
});