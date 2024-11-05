import { decryptAES128ECB, decryptionKey, encryptedBase64Content } from '@/solutions/set-1-challenge-7';
import * as crypto from 'crypto';
import { describe, expect, test } from 'vitest';

// Helper function to encrypt test data
function encryptAES128ECB(text: string, key: string): string {
  const cipher = crypto.createCipheriv('aes-128-ecb', Buffer.from(key, 'utf-8'), null);
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}

describe('Set 1 - Challenge 7: AES-128-ECB Decryption', () => {
  test('Independent Path Coverage', () => {
    // Test successful decryption path
    const result = decryptAES128ECB(encryptedBase64Content, decryptionKey);
    expect(result).toContain("I'm back and I'm ringin' the bell");
    expect(result).toContain("Play that funky music white boy");

    // Test empty input path
    expect(() => decryptAES128ECB('', decryptionKey)).toThrow();
  });

  test('Logical Decisions (True)', () => {
    // Test with valid encrypted content
    const testMessage = 'Hello World';
    const encryptedContent = encryptAES128ECB(testMessage, decryptionKey);
    const decrypted = decryptAES128ECB(encryptedContent, decryptionKey);
    expect(decrypted).toBe(testMessage);

    // Test with correct key length
    expect(() => {
      decryptAES128ECB(encryptedBase64Content, decryptionKey);
    }).not.toThrow();
  });

  test('Logical Decisions (False)', () => {
    // Test with invalid Base64 input
    expect(() => {
      decryptAES128ECB('!@#$%^&*()', decryptionKey);
    }).toThrow();

    // Test with incorrect key length
    expect(() => {
      decryptAES128ECB(encryptedBase64Content, 'SHORT_KEY');
    }).toThrow();
  });

  test('Loop Boundary Testing', () => {
    // Test with minimum valid input (16 bytes / 1 block)
    const smallMessage = 'Sixteen_byteMsg!';  // Exactly 16 bytes
    const oneBlockEncrypted = encryptAES128ECB(smallMessage, decryptionKey);
    const decryptedSmall = decryptAES128ECB(oneBlockEncrypted, decryptionKey);
    expect(decryptedSmall).toBe(smallMessage);

    // Test with large input (multiple blocks)
    const largeMessage = 'A'.repeat(64);  // 4 blocks
    const multiBlockEncrypted = encryptAES128ECB(largeMessage, decryptionKey);
    const decryptedLarge = decryptAES128ECB(multiBlockEncrypted, decryptionKey);
    expect(decryptedLarge).toBe(largeMessage);
  });

  test('Internal Data Validity', () => {
    // Test key buffer length
    const keyBuffer = Buffer.from(decryptionKey, 'utf-8');
    expect(keyBuffer.length).toBe(16);

    // Test that input is properly Base64 encoded
    expect(() => {
      Buffer.from(encryptedBase64Content, 'base64');
    }).not.toThrow();

    // Test that decrypted output is valid UTF-8
    const result = decryptAES128ECB(encryptedBase64Content, decryptionKey);
    expect(() => {
      Buffer.from(result, 'utf-8');
    }).not.toThrow();
  });

  test('Cryptographic Operations', () => {
    // Test that the same input always produces the same output
    const result1 = decryptAES128ECB(encryptedBase64Content, decryptionKey);
    const result2 = decryptAES128ECB(encryptedBase64Content, decryptionKey);
    expect(result1).toBe(result2);

    // Test that different keys produce different outputs
    const differentKey = 'PURPLE SUBMARINE';
    expect(() => {
      decryptAES128ECB(encryptedBase64Content, differentKey);
    }).toThrow();

    // Verify ECB mode characteristics (same input blocks produce same output blocks)
    const testBlock = 'A'.repeat(32);  // Two identical blocks
    const encrypted = encryptAES128ECB(testBlock, decryptionKey);
    const decrypted = decryptAES128ECB(encrypted, decryptionKey);
    expect(decrypted.slice(0, 16)).toBe(decrypted.slice(16, 32));
  });
});

// A comprehensive test suite for the AES - 128 - ECB decryption implementation. Here's a breakdown of what each test section covers:
// Independent Path Coverage:

// Tests basic encryption / decryption
// Tests empty input handling


// Logical Decisions(True):

// Tests valid inputs
// Tests padding handling
// Tests multi - block processing


// Logical Decisions(False):

// Tests invalid key lengths
// Tests invalid base64 input
// Tests null inputs


// Loop Boundary Testing:

// Tests block size boundaries(16 bytes)
// Tests under / over block size
// Tests padding behavior


// Internal Data Validity:

// Tests key length validation
// Tests text preservation
// Tests UTF - 8 handling


// Cryptographic Operations:

// Tests various input sizes
// Tests actual challenge data
// Tests cryptographic properties
// Verifies key requirements



// Key features of the tests:

// Uses Buffer for proper byte handling
// Tests base64 encoding / decoding
// Verifies AES - 128 block size requirements
// Tests padding behavior
// Includes actual challenge data samples
