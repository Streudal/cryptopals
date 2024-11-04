import { decryptXorCipher, decryptedXorCipher, hexStringInput, hexToBytes, scoreEnglishText, xorBytesWithKey } from '@/solutions/set-1-challenge-3';
import { describe, expect, test } from 'vitest';

describe('Set 1 - Challenge 3: Single-byte XOR Cipher', () => {
  test('Independent Path Coverage', () => {
    // Test complete decryption path
    const result = decryptXorCipher(hexStringInput);
    expect(result.plaintext).toBe("Cooking MC's like a pound of bacon");
    expect(result.character).toBe('X');

    // Test the scoring function with known English text
    const englishScore = scoreEnglishText('Hello World');
    const gibberishScore = scoreEnglishText('xkcd vbnt');
    expect(englishScore).toBeGreaterThan(gibberishScore);
  });

  test('Logical Decisions (True)', () => {
    // Test hex to bytes conversion
    const bytes = hexToBytes('4142');
    expect(bytes).toEqual([65, 66]); // 'AB' in ASCII

    // Test XOR operation
    const xored = xorBytesWithKey([65, 66], 88); // XOR 'AB' with 'X'
    expect(xored).toEqual([25, 26]); // Expected XOR results

    // Test scoring function with valid characters
    const score = scoreEnglishText('the');
    expect(score).toBeGreaterThan(0);
  });

  test('Logical Decisions (False)', () => {
    // Test scoring with invalid characters
    const score = scoreEnglishText('!@#$%');
    expect(score).toBe(0);

    // Test hex conversion with invalid hex
    const invalidHexResult = hexToBytes('ZZ');
    expect(invalidHexResult).toEqual([NaN]);

    // Test scoring with empty string
    expect(scoreEnglishText('')).toBe(0);
  });

  test('Loop Boundary Testing', () => {
    // Test single byte hex conversion
    expect(hexToBytes('41')).toEqual([65]);

    // Test empty hex string
    expect(hexToBytes('')).toEqual([]);

    // Test XOR with boundary values
    expect(xorBytesWithKey([0], 0)).toEqual([0]);
    expect(xorBytesWithKey([255], 255)).toEqual([0]);

    // Test decryption with different length inputs
    const shortHex = '41'; // Single byte
    const result = decryptXorCipher(shortHex);
    expect(result).toHaveProperty('plaintext');
    expect(result).toHaveProperty('key');
    expect(result).toHaveProperty('score');
  });

  test('Internal Data Validity', () => {
    // Test character frequency scoring
    const frequencies = {
      'e': scoreEnglishText('e'),
      'z': scoreEnglishText('z'),
      ' ': scoreEnglishText(' ')
    };
    expect(frequencies[' ']).toBeGreaterThan(frequencies['e']);
    expect(frequencies['e']).toBeGreaterThan(frequencies['z']);

    // Test key character mapping
    const result = decryptXorCipher(hexStringInput);
    expect(result.character.charCodeAt(0)).toBe(result.key);

    // Test decryption result structure
    expect(decryptedXorCipher).toEqual({
      key: expect.any(Number),
      character: expect.any(String),
      plaintext: expect.any(String),
      score: expect.any(Number)
    });
  });

  test('Cryptographic Operations', () => {
    const testCases = [
      {
        // Test known plaintext encryption/decryption
        input: Buffer.from("Hello").toString('hex'),
        expectedLength: 5,
      },
      {
        // Test null bytes
        input: '0000',
        expectedLength: 2,
      },
      {
        // Test full byte range
        input: Buffer.from([0, 128, 255]).toString('hex'),
        expectedLength: 3,
      },
      {
        // Test the main challenge input
        input: hexStringInput,
        expectedResult: {
          plaintext: "Cooking MC's like a pound of bacon",
          character: 'X'
        }
      }
    ];

    testCases.forEach(({ input, expectedLength, expectedResult }) => {
      const result = decryptXorCipher(input);
      if (expectedLength) {
        expect(result.plaintext).toHaveLength(expectedLength);
      }
      if (expectedResult) {
        expect(result.plaintext).toBe(expectedResult.plaintext);
        expect(result.character).toBe(expectedResult.character);
      }
    });

    // Test scoring consistency
    const text1 = 'THE QUICK BROWN FOX';
    const text2 = 'ZXCV QWER UIOP';
    expect(scoreEnglishText(text1))
      .toBeGreaterThan(scoreEnglishText(text2));

    // Test XOR properties
    const bytes = [65, 66, 67]; // 'ABC'
    const key = 88; // 'X'
    const xored = xorBytesWithKey(bytes, key);
    const doubleXored = xorBytesWithKey(xored, key);
    expect(doubleXored).toEqual(bytes); // Double XOR should return original
  });
});

// A comprehensive test suite for the single - byte XOR cipher decryption.Here's a breakdown of what each test section covers:
// Independent Path Coverage:

// Tests the complete decryption flow
// Tests English text scoring


// Logical Decisions(True):

// Tests hex to bytes conversion
// Tests XOR operations
// Tests scoring with valid input


// Logical Decisions(False):

// Tests invalid character scoring
// Tests invalid hex conversion
// Tests empty string cases


// Loop Boundary Testing:

// Tests single byte operations
// Tests empty input
// Tests boundary values(0, 255)


// Internal Data Validity:

// Tests character frequency scoring
// Tests key - character mapping
// Tests result structure


// Cryptographic Operations:

// Tests known plaintext cases
// Tests null bytes
// Tests full byte range
// Tests XOR properties
// Tests scoring consistency
