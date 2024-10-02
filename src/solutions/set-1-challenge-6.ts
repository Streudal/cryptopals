const base64EncodedCiphertext = `
PASTE FILE CONTENTS HERE
`;

// Function to calculate the Hamming distance (bitwise difference)
function hammingDistance(str1: string, str2: string) {
  if (str1.length !== str2.length) throw new Error("Strings must be of equal length");

  let distance = 0;

  for (let i = 0; i < str1.length; i++) {
    let xorResult = str1.charCodeAt(i) ^ str2.charCodeAt(i);
    distance += xorResult.toString(2).split("1").length - 1; // Count the number of differing bits
  }

  return distance;
}

// Function to compute the normalized Hamming distance
function normalizedHammingDistance(ciphertext: Uint8Array, keysize: number) {
  let chunks = [];

  for (let i = 0; i < 4; i++) {
    chunks.push(ciphertext.slice(i * keysize, (i + 1) * keysize));
  }

  let totalDistance = 0;
  let comparisons = 0;

  for (let i = 0; i < chunks.length - 1; i++) {
    for (let j = i + 1; j < chunks.length; j++) {
      totalDistance += hammingDistance(
        String.fromCharCode.apply(null, chunks[i]! as unknown as number[]),
        String.fromCharCode.apply(null, chunks[j]! as unknown as number[])
      );

      comparisons++;
    }
  }

  return totalDistance / (comparisons * keysize);
}

// Function to find the best keysize based on normalized Hamming distance
function findKeySize(ciphertext: Uint8Array) {
  let smallestDistance = Number.MAX_VALUE;
  let likelyKeySize = 2;

  for (let keysize = 2; keysize <= 40; keysize++) {
    const distance = normalizedHammingDistance(ciphertext, keysize);

    if (distance < smallestDistance) {
      smallestDistance = distance;
      likelyKeySize = keysize;
    }
  }

  return likelyKeySize;
}

// Function to transpose blocks based on the keysize
function transposeBlocks(ciphertext: Uint8Array, keysize: number) {
  let blocks: Uint8Array[] = [];

  for (let i = 0; i < keysize; i++) {
    let block: number[] = [];

    for (let j = i; j < ciphertext.length; j += keysize) {
      block.push(ciphertext[j]!);
    }

    blocks.push(new Uint8Array(block));
  }

  return blocks;
}

// Function to score text based on frequency analysis
function scoreEnglishText(text: string) {
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

// Function to decrypt single-byte XOR for each block
function singleByteXorDecrypt(block: Uint8Array) {
  let bestKey = 0;
  let bestScore = -Infinity;

  for (let key = 0; key < 256; key++) {
    let decodedText = "";

    for (let byte of block) {
      decodedText += String.fromCharCode(byte ^ key);
    }

    const score = scoreEnglishText(decodedText);

    if (score > bestScore) {
      bestScore = score;
      bestKey = key;
    }
  }

  return bestKey;
}

// Convert Base64 to byte array
function base64ToByteArray(base64: string) {
  const binaryString = atob(base64);
  const byteArray = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }

  return byteArray;
}

// Function to decrypt the entire ciphertext using the discovered key
function decrypt(ciphertext: Uint8Array, key: Uint8Array) {
  let decryptedPlaintext = "";

  for (let i = 0; i < ciphertext.length; i++) {
    decryptedPlaintext += String.fromCharCode(ciphertext[i]! ^ key[i % key.length]!);
  }

  return decryptedPlaintext;
}

// Full decryption process
const ciphertext = base64ToByteArray(base64EncodedCiphertext);
const keysize = findKeySize(ciphertext);
const transposedBlocks = transposeBlocks(ciphertext, keysize);
const key = transposedBlocks.map((block) => singleByteXorDecrypt(block));
const decryptedMessage = decrypt(ciphertext, new Uint8Array(key));

console.log(decryptedMessage); // Vanilla Ice - Play That Funky Music Lyrics
