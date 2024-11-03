// @ts-nocheck
const fileContents = `
PASTE FILE CONTENTS HERE
`;

function findEncryptedString(fileContent: string) {
  const lines = fileContent.split("\n");
  let bestScore = 0;
  let bestLine = "";
  let bestKey = 0;
  let bestPlaintext = "";

  for (const line of lines) {
    if (line.length === 60) {
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

const solution = findEncryptedString(fileContents);
console.log(`Character Key: ${solution.key}`);
console.log(`Character: ${solution.character}`);
console.log(`Line: ${solution.line}`);
console.log(`Plaintext: ${solution.plaintext}`);
