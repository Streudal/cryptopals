import { isValidHex } from '@/lib/utils';
import { decryptXorCipher } from '@/solutions/set-1-challenge-3';
import { describe, expect, test } from 'vitest';

function findEncryptedString(fileContent: string) {
  const lines = fileContent.split("\n").filter(Boolean);
  let bestScore = 0;
  let bestLine = "";
  let bestKey = 0;
  let bestPlaintext = "";

  for (const line of lines) {
    if (line.length === 60 && isValidHex(line)) {
      const { key, plaintext, score } = decryptXorCipher(line);// from previous challenge solution (Set 1 Challenge 3)
      if (score > bestScore) {
        bestScore = score;
        bestLine = line;
        bestKey = key;
        bestPlaintext = plaintext;
      }
    }
  }

  return {
    key: bestKey,
    character: String.fromCharCode(bestKey),
    line: bestLine,
    plaintext: bestPlaintext
  }
}

describe('Set 1 - Challenge 4: Detect single-character XOR', () => {
  test('Independent Path Coverage', () => {
    // Test with sample of encoded lines
    const sampleLines =
      '0e3647e8592d35514a081243582536ed3de6734059001e3f535ce6271032\n' +
      '334b041de124f73c18011a50e608097ac308ecee501337ec3e100854201d\n';
    const result = findEncryptedString(sampleLines);
    expect(result).toEqual({
      key: expect.any(Number),
      character: expect.any(String),
      line: expect.stringMatching(/^[0-9a-f]{60}$/),
      plaintext: expect.any(String)
    });

    // Test that decryption works with imported function
    const { plaintext } = decryptXorCipher('0e3647e8592d35514a081243582536ed3de6734059001e3f535ce6271032');
    expect(plaintext).toBeTruthy();
  });

  test('Logical Decisions (True)', () => {
    // Test that function finds the highest scoring line
    const twoLines =
      'dead00dead00dead00dead00dead00dead00dead00dead00dead00dead00\n' +  // gibberish
      '4e6f77207468617420776520686176652074686520636f6e666964656e\n';   // English text
    const result = findEncryptedString(twoLines);
    expect(result.line).toBe('4e6f77207468617420776520686176652074686520636f6e666964656e');

    // Test handling of multiple identical high-scoring lines
    const duplicateLines =
      '4e6f77207468617420776520686176652074686520636f6e666964656e\n' +
      '4e6f77207468617420776520686176652074686520636f6e666964656e\n';
    const duplicateResult = findEncryptedString(duplicateLines);
    expect(duplicateResult.line).toBe('4e6f77207468617420776520686176652074686520636f6e666964656e');
  });

  test('Logical Decisions (False)', () => {
    // Test with no 60-character lines
    const shortLines =
      'deadbeef\n' +
      'cafebabe\n';
    const result = findEncryptedString(shortLines);
    expect(result.line).toBe('');
    expect(result.key).toBe(0);

    // Test with empty input
    const emptyResult = findEncryptedString('');
    expect(emptyResult).toEqual({
      key: 0,
      character: '\x00',
      line: '',
      plaintext: ''
    });

    // Test with only invalid hex
    const invalidLines =
      'ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ\n' +
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\n';
    const invalidResult = findEncryptedString(invalidLines);
    expect(invalidResult.line).toBe('');
  });

  test('Loop Boundary Testing', () => {
    // Test with single line exactly 60 characters
    const singleLine = '0e3647e8592d35514a081243582536ed3de6734059001e3f535ce6271032\n';
    const result = findEncryptedString(singleLine);
    expect(result.line).toHaveLength(60);

    // Test with lines just under and over 60 characters
    const mixedLines =
      '0e3647e8592d35514a081243582536ed3de6734059001e3f535ce62710\n' + // 58 chars
      '0e3647e8592d35514a081243582536ed3de6734059001e3f535ce6271032\n' + // 60 chars
      '0e3647e8592d35514a081243582536ed3de6734059001e3f535ce627103211\n'; // 62 chars
    const mixedResult = findEncryptedString(mixedLines);
    expect(mixedResult.line).toHaveLength(60);

    // Test with empty lines mixed in
    const emptyLines = '\n0e3647e8592d35514a081243582536ed3de6734059001e3f535ce6271032\n\n';
    const emptyLinesResult = findEncryptedString(emptyLines);
    expect(emptyLinesResult.line).toHaveLength(60);
  });

  test('Internal Data Validity', () => {
    // Test that returned key matches character
    const result = findEncryptedString('0e3647e8592d35514a081243582536ed3de6734059001e3f535ce6271032\n');
    expect(result.character.charCodeAt(0)).toBe(result.key);

    // Test that found line is valid hex
    expect(result.line).toMatch(/^[0-9a-f]{60}$/);

    // Test that plaintext is non-empty when valid line is found
    expect(result.plaintext.length).toBeGreaterThan(0);

    // Test result structure
    expect(result).toHaveProperty('key');
    expect(result).toHaveProperty('character');
    expect(result).toHaveProperty('line');
    expect(result).toHaveProperty('plaintext');
  });

  test('Cryptographic Operations', () => {
    // Test with known English text XOR'd with different keys
    const makeHexLine = (text: string, key: number): string => {
      return Array.from(text)
        .map(c => (c.charCodeAt(0) ^ key).toString(16).padStart(2, '0'))
        .join('')
        .padEnd(60, '0');
    };

    const testCases = [
      // English text XOR'd with 'X'
      makeHexLine("Now is the winter of our discontent Made glorious", 88),
      // Random hex of correct length
      'deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef',
      // The actual line from the challenge that contains English
      '7b5a4215415d544115415d5015455447414c155c46155f4058455c5b523f'
    ].join('\n');

    const result = findEncryptedString(testCases);

    // Should find the line with the highest English score
    expect(result.plaintext).toBeTruthy();
    expect(result.key).toBeGreaterThan(0);
    expect(result.line).toHaveLength(60);

    // Test with actual challenge data
    const challengeData = `
      0e3647e8592d35514a081243582536ed3de6734059001e3f535ce6271032
      334b041de124f73c18011a50e608097ac308ecee501337ec3e100854201d
    `.trim();

    const challengeResult = findEncryptedString(challengeData);
    expect(challengeResult.line).toHaveLength(60);
    expect(challengeResult.plaintext).toBeTruthy();
  });
});

// A comprehensive test suite for detecting single - character XOR encrypted strings.Here's a breakdown of what each test section covers:
// Independent Path Coverage:

// Tests single valid line processing
// Tests multiple line processing with one valid line


// Logical Decisions(True):

// Tests multiple valid lines with scoring
// Tests identical lines


// Logical Decisions(False):

// Tests invalid input scenarios
// Tests empty input
// Tests invalid hex characters


// Loop Boundary Testing:

// Tests lines that are too short
// Tests lines that are too long
// Tests empty lines


// Internal Data Validity:

// Tests line length validation
// Tests result structure
// Tests character key mapping


// Cryptographic Operations:

// Tests various input scenarios
// Tests multiple encrypted versions
// Tests scoring and key selection
