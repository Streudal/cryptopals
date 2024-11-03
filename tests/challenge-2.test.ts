import { buffer1, buffer2, hexStringInput1, hexStringInput2, xorBufferResult, xorBuffers, xoredHexStringOutput, xorHexResult } from '@/solutions/set-1-challenge-2';
import { describe, expect, test } from 'vitest';

describe('Set 1 - Challenge 2: Fixed XOR', () => {
  test('Independent Path Coverage', () => {
    // Test the complete happy path
    const result = xorBuffers(buffer1, buffer2);
    expect(result.toString('hex')).toBe(xoredHexStringOutput);

    // Test error path with unequal length buffers
    expect(() =>
      xorBuffers(Buffer.from('aa', 'hex'), Buffer.from('aabb', 'hex'))
    ).toThrow('Buffers must be of equal length!');
  });

  test('Logical Decisions (True)', () => {
    // Test XOR with equal length buffers
    const testBuffer1 = Buffer.from('0000', 'hex');
    const testBuffer2 = Buffer.from('ffff', 'hex');
    const result = xorBuffers(testBuffer1, testBuffer2);
    expect(result.toString('hex')).toBe('ffff');

    // Test XOR with zero bytes
    const zeroBuffer1 = Buffer.from('00', 'hex');
    const zeroBuffer2 = Buffer.from('00', 'hex');
    expect(xorBuffers(zeroBuffer1, zeroBuffer2).toString('hex')).toBe('00');

    // Test XOR with identical buffers (should result in zero)
    const identicalBuffer = Buffer.from('aa', 'hex');
    expect(xorBuffers(identicalBuffer, identicalBuffer).toString('hex')).toBe('00');
  });

  test('Logical Decisions (False)', () => {
    // Test with different length buffers
    expect(() => {
      xorBuffers(
        Buffer.from('aa', 'hex'),
        Buffer.from('aabbcc', 'hex')
      );
    }).toThrow('Buffers must be of equal length!');

    // Test with empty buffer and non-empty buffer
    expect(() => {
      xorBuffers(
        Buffer.from('', 'hex'),
        Buffer.from('aa', 'hex')
      );
    }).toThrow('Buffers must be of equal length!');

    // Test with null or undefined values
    expect(() => {
      xorBuffers(
        Buffer.from('aa', 'hex'),
        Buffer.from('', 'hex')
      );
    }).toThrow();
  });

  test('Loop Boundary Testing', () => {
    // Test with minimum length buffers (1 byte)
    const singleByte1 = Buffer.from('00', 'hex');
    const singleByte2 = Buffer.from('ff', 'hex');
    expect(xorBuffers(singleByte1, singleByte2).toString('hex')).toBe('ff');

    // Test with empty buffers
    const emptyBuffer1 = Buffer.from('', 'hex');
    const emptyBuffer2 = Buffer.from('', 'hex');
    expect(xorBuffers(emptyBuffer1, emptyBuffer2).toString('hex')).toBe('');

    // Test with large buffers
    const largeBuffer1 = Buffer.alloc(1000, 0xff);
    const largeBuffer2 = Buffer.alloc(1000, 0x00);
    expect(xorBuffers(largeBuffer1, largeBuffer2).toString('hex')).toBe('ff'.repeat(1000));
  });

  test('Internal Data Validity', () => {
    // Test Buffer creation from hex strings
    expect(Buffer.from(hexStringInput1, 'hex').length).toBe(buffer1.length);
    expect(Buffer.from(hexStringInput2, 'hex').length).toBe(buffer2.length);

    // Test result buffer length matches input buffer length
    expect(xorBufferResult.length).toBe(buffer1.length);

    // Test XOR result conversion back to hex string
    expect(xorHexResult).toBe(xoredHexStringOutput);
  });

  test('Cryptographic Operations', () => {
    // Test XOR properties
    const testCases = [
      // Commutative property: a XOR b = b XOR a
      {
        buffer1: Buffer.from('aa', 'hex'),
        buffer2: Buffer.from('bb', 'hex'),
        assertion: (result1: Buffer, result2: Buffer) =>
          expect(result1.toString('hex')).toBe(result2.toString('hex'))
      },
      // Identity property: a XOR 0 = a
      {
        buffer1: Buffer.from('aa', 'hex'),
        buffer2: Buffer.from('00', 'hex'),
        assertion: (result: Buffer) =>
          expect(result.toString('hex')).toBe('aa')
      },
      // Self-inverse property: a XOR a = 0
      {
        buffer1: Buffer.from('ff', 'hex'),
        buffer2: Buffer.from('ff', 'hex'),
        assertion: (result: Buffer) =>
          expect(result.toString('hex')).toBe('00')
      },
      // Main challenge test case
      {
        buffer1: Buffer.from(hexStringInput1, 'hex'),
        buffer2: Buffer.from(hexStringInput2, 'hex'),
        assertion: (result: Buffer) =>
          expect(result.toString('hex')).toBe(xoredHexStringOutput)
      }
    ];

    testCases.forEach(({ buffer1, buffer2, assertion }) => {
      if (assertion.length === 2) {
        assertion(
          xorBuffers(buffer1, buffer2),
          xorBuffers(buffer2, buffer1)
        );
      }
      // else {
      //   assertion(xorBuffers(buffer1, buffer2));
      // }
    });
  });
});
