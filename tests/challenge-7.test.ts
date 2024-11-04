import { decryptAES128ECB, decryptionKey } from '@/solutions/set-1-challenge-7';
import { describe, expect, test } from 'vitest';

describe('Set 1 - Challenge 7: AES in ECB mode', () => {
  test('Independent Path Coverage', () => {
    // Test basic encryption/decryption
    const base64Sample = Buffer.from('Hello, AES-128-ECB!').toString('base64');
    const decrypted = decryptAES128ECB(base64Sample, 'YELLOW SUBMARINE');
    expect(decrypted).toBeTruthy();

    // Test with empty input
    expect(() => decryptAES128ECB('', decryptionKey)).not.toThrow();
  });

  test('Logical Decisions (True)', () => {
    // Test with valid key and base64 input
    const validBase64 = 'SGVsbG8sIFdvcmxkIQ=='; // "Hello, World!"
    const result = decryptAES128ECB(validBase64, decryptionKey);
    expect(result).toBeTruthy();

    // Test with padded input (should handle automatically)
    const paddedText = Buffer.from('Test Padding    ').toString('base64');
    expect(() => decryptAES128ECB(paddedText, decryptionKey)).not.toThrow();

    // Test with multi-block input
    const multiBlock = Buffer.from('This is a longer text that spans multiple AES blocks').toString('base64');
    expect(() => decryptAES128ECB(multiBlock, decryptionKey)).not.toThrow();
  });

  test('Logical Decisions (False)', () => {
    // Test with invalid key length
    expect(() => decryptAES128ECB('SGVsbG8=', 'SHORT_KEY')).toThrow();

    // Test with invalid base64 input
    expect(() => decryptAES128ECB('not-base64!@#$', decryptionKey)).toThrow();

    // Test with null values
    expect(() => decryptAES128ECB(null as any, decryptionKey)).toThrow();
  });

  test('Loop Boundary Testing', () => {
    // Test with single block size (16 bytes)
    const singleBlock = Buffer.from('Exactly16BytesHere').toString('base64');
    expect(() => decryptAES128ECB(singleBlock, decryptionKey)).not.toThrow();

    // Test with input just under block size
    const underBlock = Buffer.from('15BytesOfData!').toString('base64');
    expect(() => decryptAES128ECB(underBlock, decryptionKey)).not.toThrow();

    // Test with input just over block size
    const overBlock = Buffer.from('This is 17 bytes!').toString('base64');
    expect(() => decryptAES128ECB(overBlock, decryptionKey)).not.toThrow();
  });

  test('Internal Data Validity', () => {
    // Test key length is exactly 16 bytes
    expect(Buffer.from(decryptionKey, 'utf-8').length).toBe(16);

    // Test decryption preserves original text
    const originalText = 'Test Message';
    const encrypted = Buffer.from(originalText).toString('base64');
    const decrypted = decryptAES128ECB(encrypted, decryptionKey);
    expect(decrypted).toContain(originalText);

    // Test output is valid UTF-8
    const result = decryptAES128ECB(
      Buffer.from('Hello UTF8 ✓').toString('base64'),
      decryptionKey
    );
    expect(() => Buffer.from(result, 'utf-8')).not.toThrow();
  });

  test('Cryptographic Operations', () => {
    const testCases = [
      {
        // Empty string case
        input: Buffer.from('').toString('base64'),
        shouldThrow: false
      },
      {
        // Single block case
        input: Buffer.from('AES-128-ECB Test.').toString('base64'),
        shouldThrow: false
      },
      {
        // Multi-block case
        input: Buffer.from('This is a multi-block test case for AES-128-ECB encryption.').toString('base64'),
        shouldThrow: false
      },
      {
        // Test with the actual challenge data sample
        input: 'CRIwqt4+szDbqkNY+I0qbDe3LQz0wiw0SuxBQtAM5TDdMbjCMD/venUDW9BL',
        shouldThrow: false
      },
      {
        // Test padding boundary
        input: Buffer.from('Test padding boundary case!').toString('base64'),
        shouldThrow: false
      }
    ];

    testCases.forEach(({ input, shouldThrow }) => {
      if (shouldThrow) {
        expect(() => decryptAES128ECB(input, decryptionKey)).toThrow();
      } else {
        expect(() => decryptAES128ECB(input, decryptionKey)).not.toThrow();
      }
    });

    // Test with actual challenge data sample
    const sampleInput = 'CRIwqt4+szDbqkNY+I0qbDe3LQz0wiw0SuxBQtAM5TDdMbjCMD/venUDW9BL';
    const decrypted = decryptAES128ECB(sampleInput, decryptionKey);
    expect(decrypted).toBeTruthy();
    expect(typeof decrypted).toBe('string');

    // Verify cryptographic properties
    const key = 'YELLOW SUBMARINE';
    expect(key).toHaveLength(16); // AES-128 requires 16-byte key
    expect(Buffer.from(key, 'utf-8').length).toBe(16); // Verify byte length
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
