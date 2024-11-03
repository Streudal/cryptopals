import { base64StringOutput, byteArrayToCharCodeArray, hexStringInput, hexStringToByteArray, hexToBase64, isHexString } from '@/solutions/set-1-challenge-1';
import { describe, expect, test } from 'vitest';

describe('Set 1 - Challenge 1: Convert hex to base64', () => {
  test('Independent Path Coverage', () => {
    // Test the complete happy path
    const result = hexToBase64(hexStringInput);
    expect(result).toBe(base64StringOutput);

    // Test error path with invalid hex string
    expect(() => hexToBase64('invalid')).toThrow('Invalid hexadecimal string');
  });

  test('Logical Decisions (True)', () => {
    // Test isHexString with valid input
    expect(isHexString('1234abcd')).toEqual({ isValid: true });

    // Test hexStringToByteArray with valid input
    expect(hexStringToByteArray('1234')).toEqual(['12', '34']);

    // Test byteArrayToCharCodeArray with valid input
    expect(byteArrayToCharCodeArray(['41'])).toEqual([String.fromCharCode(65)]);
  });

  test('Logical Decisions (False)', () => {
    // Test odd length string
    expect(isHexString('123')).toEqual({
      isValid: false,
      errorMsg: 'Invalid hexadecimal string - length must be even!'
    });

    // Test invalid characters
    expect(isHexString('12gh')).toEqual({
      isValid: false,
      errorMsg: 'Invalid hexadecimal string - contains invalid characters!'
    });

    // Test throwing error for invalid hex
    expect(() => hexToBase64('12gh')).toThrow();
  });

  test('Loop Boundary Testing', () => {
    // Test empty string
    expect(isHexString('')).toEqual({ isValid: false, errorMsg: 'Invalid hexadecimal string - length must not be empty!' });

    // Test minimum valid length (2 characters)
    expect(hexToBase64('41')).toBe('QQ==');

    // Test multiple of 2 characters
    expect(hexToBase64('4141')).toBe('QUE=');
    expect(hexToBase64('414141')).toBe('QUFB');
  });

  test('Internal Data Validity', () => {
    // Test byte array conversion
    const byteArray = hexStringToByteArray('414243');
    expect(byteArray).toEqual(['41', '42', '43']);

    // Test char code conversion
    const charCodes = byteArrayToCharCodeArray(['41', '42', '43']);
    expect(charCodes).toEqual(['A', 'B', 'C']);

    // Test complete conversion chain
    expect(hexToBase64('414243')).toBe('QUJD');
  });

  test('Cryptographic Operations', () => {
    // Test known cryptographic conversions
    const testCases = [
      { hex: '00', base64: 'AA==' },
      { hex: 'ff', base64: '/w==' },
      { hex: 'ffffff', base64: '////' },
      { hex: '000000', base64: 'AAAA' },
      { hex: hexStringInput, base64: base64StringOutput }
    ];

    testCases.forEach(({ hex, base64 }) => {
      expect(hexToBase64(hex.toLowerCase())).toBe(base64);
    });
  });
});


// Independent Path Coverage:

// Tests the main success path
// Tests the error path


// Logical Decisions(True):

// Tests valid hex string validation
// Tests byte array conversion
// Tests character code conversion


// Logical Decisions(False):

// Tests invalid hex string cases
// Tests error handling for odd length
// Tests error handling for invalid characters


// Loop Boundary Testing:

// Tests empty string
// Tests minimum valid length
// Tests various string lengths


// Internal Data Validity:

// Tests intermediate data transformations
// Tests the complete conversion chain
// Verifies data integrity at each step


// Cryptographic Operations:

// Tests known hex to base64 conversions
// Tests edge cases(all zeros, all ones)
// Tests the main challenge input
