import { detectECBEncryptedCiphertexts } from '@/solutions/set-1-challenge-8';
import { describe, expect, test } from 'vitest';

describe('Set 1 - Challenge 8: Detect AES in ECB mode', () => {
  test('Independent Path Coverage', () => {
    const ciphertexts = [
      '1111122222',
      '1111111111',
    ];
    expect(detectECBEncryptedCiphertexts(ciphertexts)).toBe(-1);
  });

  test('Logical Decisions (True)', () => {
    const ciphertexts = [
      'aabbccddaabbccdd',
      'aabbccddeeffgghh'
    ];
    const result = detectECBEncryptedCiphertexts(ciphertexts);
    expect(result).toBe(-1);
  });

  test('Logical Decisions (False)', () => {
    const ciphertexts = [
      'aabbccddaabbccdd',
      '1122334455667788'
    ];
    const result = detectECBEncryptedCiphertexts(ciphertexts);
    expect(result).toBe(-1);
  });

  test('Loop Boundary Testing', () => {
    expect(detectECBEncryptedCiphertexts([])).toBe(-1);
    expect(detectECBEncryptedCiphertexts(['aabbccdd'])).toBe(-1);
    const longText = 'aa' .repeat(16) + 'bb' .repeat(16); + 'aa' .repeat(16);
    expect(detectECBEncryptedCiphertexts([longText])).toBe(-1);
  });

  test('Internal Data Validity', () => {
    const invalidHex = [
      'GHIJKLMN',
      'aabbccdd'
    ];
    expect(() => detectECBEncryptedCiphertexts(invalidHex)).not.toThrow();

    const oddLength = [
      'aaa',
      'bbbb'
    ];
    expect(() => detectECBEncryptedCiphertexts(oddLength)).not.toThrow();
  });

  test('Cryptographic Operations', () => {
    const realECBExample = [
      'e8ed25e6f2b5cd72277cff0831b34d9980566aa183ec0e171ee3539bcdd70c83',
      
      'd880619740a8a19b7840a8a31c810a3d08649af70dc06f4fd5d2d69c744cd283' +
      'd880619740a8a19b7840a8a31c810a3d08649af70dc06f4fd5d2d69c744cd283'
    ];
    expect(detectECBEncryptedCiphertexts(realECBExample)).toBe(1);
  });
});
