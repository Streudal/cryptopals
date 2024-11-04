import { decryptXorCipher } from '@/solutions/set-1-challenge-3';
import { fileContents, findEncryptedString } from '@/solutions/set-1-challenge-4';
import { describe, expect, test } from 'vitest';

describe('Set 1 - Challenge 4: Detect single-character XOR', () => {
  test('Independent Path Coverage', () => {
    // Test with sample of encoded lines
    const sampleLines = `
    7b5a4215415d544115415d5015455447414c155c46155f4058455c5b523f
    7b5a4215415d544115415d5015455447414c155c46155f4058455c5b523f
    `;
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

    // Test against main file contents
    const main = findEncryptedString(fileContents);
    expect(main.plaintext.trim()).toBe('Now that the party is jumping');
  });

  test('Logical Decisions (True)', () => {
    // Test that function finds the highest scoring line
    // gibberish (1st line)
    // English text (2nd line)
    const twoLines = `
    7b5a4215415d544115415d5015455447414c155c46155f4058455c5b523f
    4e6f77207468617420776520686176652074686520636f6e666964656e
    `;
    const result = findEncryptedString(twoLines);
    expect(result.line).toBe('7b5a4215415d544115415d5015455447414c155c46155f4058455c5b523f');

    // Test handling of multiple identical high-scoring lines
    const duplicateLines = `
    7b5a4215415d544115415d5015455447414c155c46155f4058455c5b523f
    7b5a4215415d544115415d5015455447414c155c46155f4058455c5b523f
    `;

    const duplicateResult = findEncryptedString(duplicateLines);
    console.log('RESULTS: ', duplicateResult)
    expect(duplicateResult.line).toBe('7b5a4215415d544115415d5015455447414c155c46155f4058455c5b523f');
  });

  test('Logical Decisions (False)', () => {
    // Test with no 60-character lines
    const shortLines = `
    deadbeef
    cafebabe
    `;

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
    const invalidLines = `
    ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ
    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    `;

    const invalidResult = findEncryptedString(invalidLines);
    expect(invalidResult.line).toBe('');
  });

  test('Loop Boundary Testing', () => {
    // Test with single line exactly 60 characters
    const singleLine = '0e3647e8592d35514a081243582536ed3de6734059001e3f535ce6271032\n';
    const result = findEncryptedString(singleLine);
    expect(result.line).toHaveLength(60);

    // Test with lines just under and over 60 characters
    // 1st line - 58 characters 
    // 1st line - 60 characters 
    // 1st line - 62 characters 
    const mixedLines = `
    0e3647e8592d35514a081243582536ed3de6734059001e3f535ce62710
    0e3647e8592d35514a081243582536ed3de6734059001e3f535ce6271032
    0e3647e8592d35514a081243582536ed3de6734059001e3f535ce627103211
    `;
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
    `;

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
