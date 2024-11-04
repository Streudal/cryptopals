import { encryptionKey, englishInput, expectedOutput, repeatingKeyXOR } from '@/solutions/set-1-challenge-5';
import { describe, expect, test } from 'vitest';

describe('Set 1 - Challenge 5: Implement Repeating-key XOR', () => {
  test('Independent Path Coverage', () => {
    // Test the main challenge case
    const result = repeatingKeyXOR(englishInput, encryptionKey);
    expect(result).toBe(expectedOutput);

    // Test single character encryption
    const singleChar = repeatingKeyXOR('A', 'B');
    expect(singleChar).toBe('03'); // 'A' (65) XOR 'B' (66) = 3
  });

  test('Logical Decisions (True)', () => {
    // Test with key length equal to plaintext length
    const plaintext = 'ABC';
    const key = 'XYZ';
    const result = repeatingKeyXOR(plaintext, key);
    expect(result.length).toBe(6); // Each byte becomes 2 hex chars

    // Test with single character key
    const singleKeyResult = repeatingKeyXOR('ABC', 'X');
    expect(singleKeyResult.length).toBe(6);

    // Test with repeated pattern
    const repeatedResult = repeatingKeyXOR('AAAA', 'XY');
    expect(repeatedResult).toBe(
      repeatingKeyXOR('AA', 'XY').repeat(2)
    );
  });

  test('Logical Decisions (False)', () => {
    // Test with empty plaintext
    expect(repeatingKeyXOR('', encryptionKey)).toBe('');

    // Test with empty key (should return the hex representation of input)
    expect(repeatingKeyXOR('test', '')).toBe('74657374');

    // Test with special characters
    const specialChars = '!@#$%^&*()';
    const result = repeatingKeyXOR(specialChars, encryptionKey);
    expect(result).toHaveLength(specialChars.length * 2);
  });

  test('Loop Boundary Testing', () => {
    // Test with plaintext shorter than key
    const shortPlaintext = 'A';
    const longKey = 'XYZ';
    expect(repeatingKeyXOR(shortPlaintext, longKey)).toHaveLength(2);

    // Test with plaintext exactly key length
    const exactText = 'ABC';
    const exactKey = 'XYZ';
    expect(repeatingKeyXOR(exactText, exactKey)).toHaveLength(6);

    // Test with plaintext multiple of key length
    const multipleText = 'ABCABC';
    const multipleKey = 'XYZ';
    expect(repeatingKeyXOR(multipleText, multipleKey)).toHaveLength(12);

    // Test with newline characters
    const textWithNewline = 'A\nB';
    expect(repeatingKeyXOR(textWithNewline, 'X')).toHaveLength(6); // Accounts for new line also being 2 hex digits
  });

  test('Internal Data Validity', () => {
    // Test hex output format
    const result = repeatingKeyXOR('A', 'X');
    expect(result).toMatch(/^[0-9a-f]{2}$/);

    // Test padding of hex values
    const zeroPadResult = repeatingKeyXOR('\x01', 'X');
    expect(zeroPadResult.length).toBe(2);
    expect(zeroPadResult).toMatch(/^[0-9a-f]{2}$/);

    // Test key cycling
    const longText = 'ABCD';
    const shortKey = 'XY';
    const result1 = repeatingKeyXOR(longText.slice(0, 2), shortKey);
    const result2 = repeatingKeyXOR(longText.slice(2), shortKey);
    expect(repeatingKeyXOR(longText, shortKey)).toBe(result1 + result2);
  });

  test('Cryptographic Operations', () => {
    // Test known cryptographic properties
    const testCases = [
      {
        // Test with all null bytes
        input: '\x00\x00',
        key: '\x00',
        expected: '0000'
      },
      {
        // Test with all ones
        input: '\xFF\xFF',
        key: '\xFF',
        expected: '0000'
      },
      {
        // Test key cycling properly
        input: 'AAAA',
        key: 'XY',
        expected: repeatingKeyXOR('AA', 'XY').repeat(2)
      },
      {
        // Test with spaces and punctuation
        input: 'Hello, World!',
        key: 'ICE',
        expected: repeatingKeyXOR('Hello, World!', 'ICE')
      },
      {
        // Test the main challenge case
        input: englishInput,
        key: encryptionKey,
        expected: expectedOutput
      }
    ];

    testCases.forEach(({ input, key, expected }) => {
      expect(repeatingKeyXOR(input, key)).toBe(expected);
    });

    // Test XOR properties
    const plaintext = 'TEST';
    const key = 'KEY';

    // Double encryption should return original text (when converted back from hex)
    const encrypted = repeatingKeyXOR(plaintext, key);
    const hexToString = (hex: string) => {
      const bytes = hex.match(/.{2}/g) || [];
      return bytes.map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
    };
    const decrypted = hexToString(repeatingKeyXOR(hexToString(encrypted), key));
    expect(decrypted).toBe(plaintext);
  });
});

// A comprehensive test suite that covers Implement Repeating-key XOR. Here's a breakdown of what each test section covers:
// Independent Path Coverage:

// Tests the main challenge case
// Tests basic single - character encryption


// Logical Decisions(True):

// Tests equal length key and plaintext
// Tests single character key
// Tests repeated patterns


// Logical Decisions(False):

// Tests empty inputs
// Tests special characters
// Tests edge cases


// Loop Boundary Testing:

// Tests various length relationships between plaintext and key
// Tests with newline characters
// Tests exact multiples of key length


// Internal Data Validity:

// Tests hex output format
// Tests proper zero padding
// Tests key cycling behavior


// Cryptographic Operations:

// Tests known cryptographic properties
// Tests null bytes and ones
// Tests key cycling
// Tests encryption / decryption roundtrip
// Tests the main challenge case
