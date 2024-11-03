import { findEncryptedString } from '@/solutions/set-1-challenge-4';
import { describe, expect, test } from 'vitest';


describe('Set 1 - Challenge 4: Detect single-character XOR', () => {
  test('Independent Path Coverage', () => {
    const input = 
      '1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736\n' +
      '2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b';
    
    const result = findEncryptedString(input);
    expect(result).toHaveProperty('key');
    expect(result).toHaveProperty('character');
    expect(result).toHaveProperty('line');
    expect(result).toHaveProperty('plaintext');
  });

  test('Logical Decisions (True)', () => {
    const input = 
      '0123456789'.repeat(6) + '\n' +
      'abcdefghij'.repeat(6);
    
    const result = findEncryptedString(input);
    expect(result.line.length).toBe(60);
    expect(result.key).toBeGreaterThanOrEqual(0);
    expect(result.key).toBeLessThanOrEqual(255);
  });

  test('Logical Decisions (False)', () => {
    const input = 
      '123456\n' +  
      'abcdef\n' +  
      '0123456789'.repeat(7);

    const result = findEncryptedString(input);
    expect(result.line).toBe('');
    expect(result.plaintext).toBe('');
  });

  test('Loop Boundary Testing', () => {
    expect(findEncryptedString('')).toEqual({
      key: 0,
      character: String.fromCharCode(0),
      line: '',
      plaintext: ''
    });
  
    const singleLine = '0123456789'.repeat(6);
    const result = findEncryptedString(singleLine);
    expect(result.line.length).toBe(60);

    const multiLine = 
      '0123456789'.repeat(6) + '\n' +
      'abcdefghij'.repeat(6) + '\n' +
      '9876543210'.repeat(6);
    expect(findEncryptedString(multiLine).line.length).toBe(60);
  });

  test('Internal Data Validity', () => {
    const invalidHex = 
      'GHIJKLMNOP'.repeat(6) + '\n' +
      '0123456789'.repeat(6);
    
    const result = findEncryptedString(invalidHex);
    expect(result.line).toBe('0123456789'.repeat(6));

    const mixedCase = 
      'AbCdEf0123'.repeat(6) + '\n' +
      '0123456789'.repeat(6);
    
    expect(() => findEncryptedString(mixedCase)).not.toThrow();
  });

  test('Cryptographic Operations', () => {
    const encryptedData = [
      '1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a'
    ].join('\n');

    const result = findEncryptedString(encryptedData);
    
    console.log('Test input lines:', encryptedData.split('\n').map(line => ({
      length: line.length,
      line
    })));
    
    console.log('Decryption result:', {
      key: result.key,
      character: result.character,
      plaintext: result.plaintext,
      lineLength: result.line.length
    });

    expect(result.line).toBe('1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a');
    
    expect(result.plaintext.toUpperCase()).toMatch(/['ETAOIN SHRDLU']/);
    
    expect(result.key).toBeGreaterThanOrEqual(32);
    expect(result.key).toBeLessThanOrEqual(126);
  });
});
