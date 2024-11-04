// Function to calculate the Hamming distance (bitwise difference)
function hammingDistance(str1: string, str2: string) {
  if (str1.length !== str2.length) throw new Error("Strings must be of equal length");

  let distance = 0;
  for (let i = 0; i < str1.length; i++) {
    let xorResult = str1.charCodeAt(i) ^ str2.charCodeAt(i);
    distance += xorResult.toString(2).split("1").length - 1;
  }
  return distance;
}

// Function to compute the normalized Hamming distance
function normalizedHammingDistance(ciphertext: Uint8Array, keysize: number) {
  // Make sure we have enough data for at least 2 complete chunks
  if (ciphertext.length < keysize * 2) {
    return Number.MAX_VALUE;
  }

  let chunks: Uint8Array[] = [];
  let numFullChunks = Math.floor(ciphertext.length / keysize);
  numFullChunks = Math.min(numFullChunks, 4); // Take at most 4 chunks

  // Only take complete chunks
  for (let i = 0; i < numFullChunks; i++) {
    chunks.push(ciphertext.slice(i * keysize, (i + 1) * keysize));
  }

  let totalDistance = 0;
  let comparisons = 0;

  // Compare each chunk with every other chunk
  for (let i = 0; i < chunks.length - 1; i++) {
    for (let j = i + 1; j < chunks.length; j++) {
      const str1 = String.fromCharCode.apply(null, Array.from(chunks[i]));
      const str2 = String.fromCharCode.apply(null, Array.from(chunks[j]));
      totalDistance += hammingDistance(str1, str2);
      comparisons++;
    }
  }

  // Avoid division by zero
  if (comparisons === 0) return Number.MAX_VALUE;

  return totalDistance / (comparisons * keysize);
}

// Function to find the best keysize based on normalized Hamming distance
function findKeySize(ciphertext: Uint8Array) {
  let smallestDistance = Number.MAX_VALUE;
  let likelyKeySize = 2;

  // Only try keysizes that would give us at least 2 complete chunks
  const maxKeySize = Math.min(40, Math.floor(ciphertext.length / 2));

  for (let keysize = 2; keysize <= maxKeySize; keysize++) {
    const distance = normalizedHammingDistance(ciphertext, keysize);
    if (distance < smallestDistance) {
      smallestDistance = distance;
      likelyKeySize = keysize;
    }
  }

  return likelyKeySize;
}

// Example usage and test
const testData = new Uint8Array(100);
// Fill test data with some values
for (let i = 0; i < testData.length; i++) {
  testData[i] = i % 256;
}

const keysize = findKeySize(testData);
console.log("Found keysize:", keysize);
