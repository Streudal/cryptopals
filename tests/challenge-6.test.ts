
import { base64EncodedCiphertext, base64ToByteArray, decrypt, findKeySize, hammingDistance, scoreEnglishText, singleByteXorDecrypt, transposeBlocks } from '@/solutions/set-1-challenge-6';
import { describe, expect, test } from 'vitest';

describe('Set 1 - Challenge 6: Detect AES in ECB mode', () => {
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
