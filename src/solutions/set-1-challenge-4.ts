// @ts-nocheck
const fileContents = `
PASTE FILE CONTENTS HERE
`;

function decryptXorCipher(hexString: string) {
  console.log('Hex String: ${hexString}');

  let bestScore = 0;
  let bestKey = 0;
  let bestPlaintext = '';

  const bytes = Buffer.from(hexString, 'hex');

  for (let key = 0; key < 256; key++) {
    const decoded = bytes.map(byte => byte ^ key);
    const text = Buffer.from(decoded).toString('ascii');
    const score = scoreText(text);

    console.log('Key:, ${key}, Text: ${text}, Score: ${score}');

    if (score > bestScore) {
      bestScore = score;
      bestKey = key;
      bestPlaintext = text;
    }
  }

  console.log('Best Key:, ${bestKey}, Best Plaintext: ${bestPlaintext}, Best Score: ${bestScore}');

  return { 
    key: bestKey, 
    plaintext: bestPlaintext, 
    score: bestScore };
}

function scoreText(text: string): number {
  console.log('Input Text: ${text}');

  const commonLetters = 'ETAOIN SHRDLU';
  const upperText = text.toUpperCase();
  
  return upperText.split('').reduce((score, char) => {
    if (commonLetters.includes(char)) {
      score += 2;
    } else if (/[A-Z\s.,]/.test(char)) {
      score += 1;
    }
    return score;
  }, 0);
  console.log('Score: ${score}');
  return score;
}

export function findEncryptedString(fileContent: string) {
  const lines = fileContent.split("\n");
  let bestScore = -1;
  let bestLine = '';
  let bestKey = 0;
  let bestPlaintext = '';

  for (const line of lines) {
    if (line.length === 60) {
      const { key, plaintext, score } = decryptXorCipher(line);
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

export const solution = findEncryptedString(fileContents);
console.log(`Character Key: ${solution.key}`);
console.log(`Character: ${solution.character}`);
console.log(`Line: ${solution.line}`);
console.log(`Plaintext: ${solution.plaintext}`);
