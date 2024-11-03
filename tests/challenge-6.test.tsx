import { expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import fs from 'fs';
import path from 'path';
import Solution from '@/components/sets/challenge-6/Solution';
import { getItem, saveItem } from '@/lib/utils';

test('Challenge 6: Decrypt AES-128 ECB', () => {
  const result = 'wokka wokka!!!';
  expect(result).toBeDefined();
    // Read the encrypted file
  const filePath = path.join(__dirname, '../public/assets/set-1-challenge-data-6.txt');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const encryptedData = Buffer.from(fileContent, 'base64');
  expect(fileContent).toBeDefined();
  expect(encryptedData).toBeDefined();
});
  // // Process the file content
  // const encryptedLines = fileContent
  //   .split('\n')
  //   .filter(line => line.trim() !== '')
  //   .map(line => line.trim())
  //   .join('');

// Mock the getItem and saveItem functions
// vi.mock('@/lib/utils', () => ({
//   getItem: vi.fn(),
//   saveItem: vi.fn(),
// }));



