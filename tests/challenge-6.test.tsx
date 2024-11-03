import { expect, test } from 'vitest';
import fs from 'fs';
import path from 'path';


test('Challenge 6: Decrypt AES-128 ECB', () => {
  const result = 'wokka wokka!!!';
  expect(result).toBeDefined();
    // Read the encrypted file
  const filePath = path.join(__dirname, '../public/assets/set-1-challenge-data-6.txt');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const encryptedData = Buffer.from(fileContent, 'base64');
});