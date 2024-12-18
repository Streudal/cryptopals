export const hexStringInput = "1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736";

// Scoring function to estimate how likely text is English
export function scoreEnglishText(text: string) {
  const frequency = {
    "a": 0.0651738, "b": 0.0124248, "c": 0.0217339, "d": 0.0349835, "e": 0.1041442,
    "f": 0.0197881, "g": 0.0158610, "h": 0.0492888, "i": 0.0558094, "j": 0.0009033,
    "k": 0.0050529, "l": 0.0331490, "m": 0.0202124, "n": 0.0564513, "o": 0.0596302,
    "p": 0.0137645, "q": 0.0008606, "r": 0.0497563, "s": 0.0515760, "t": 0.0729357,
    "u": 0.0225134, "v": 0.0082903, "w": 0.0171272, "x": 0.0013692, "y": 0.0145984,
    "z": 0.0007836, " ": 0.1918182
  }

  const score = text.toLowerCase()
    .split("")
    .reduce((acc, char) => acc + (frequency[char as keyof typeof frequency] || 0), 0);

  return score;
}

export function hexToBytes(hex: string): number[] {
  const bytes: number[] = [];

  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.substring(i, i + 2), 16));
  }

  return bytes;
}

export function xorBytesWithKey(bytes: number[], characterCodeKey: number) {
  return bytes.map(byte => byte ^ characterCodeKey);
}

export function decryptXorCipher(hex: string) {
  let bestScore = 0;
  let bestPlaintext = "";
  let bestKey = 0;

  const bytes = hexToBytes(hex);

  for (let key = 0; key < 256; key++) {
    const xoredBytes = xorBytesWithKey(bytes, key);
    const plaintext = String.fromCharCode(...xoredBytes);
    const score = scoreEnglishText(plaintext);

    if (score > bestScore) {
      bestScore = score;
      bestPlaintext = plaintext;
      bestKey = key;
    }
  }

  return {
    key: bestKey,
    character: String.fromCharCode(bestKey),
    plaintext: bestPlaintext,
    score: bestScore
  }
}

export const decryptedXorCipher = decryptXorCipher(hexStringInput);
console.log(`Key: ${decryptedXorCipher.key}`); // Key: X
console.log(`Character: ${decryptedXorCipher.character}`); // Character: X
console.log(`English Plaintext: ${decryptedXorCipher.plaintext}`); // English Plaintext: "Cooking MC's like a pound of bacon"
