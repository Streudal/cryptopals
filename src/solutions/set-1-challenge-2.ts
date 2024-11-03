export const hexStringInput1 = "1c0111001f010100061a024b53535009181c";
export const hexStringInput2 = "686974207468652062756c6c277320657965";
export const xoredHexStringOutput = "746865206b696420646f6e277420706c6179";

/**
 * Performs a bitwise XOR operation on two buffers.
 */
export function xorBuffers(buffer1: Buffer, buffer2: Buffer) {
  // Check if buffers are of equal length
  if (buffer1.length !== buffer2.length) {
    throw new Error("Buffers must be of equal length!");
  }

  // Create a buffer to hold the result
  const resultBuffer = Buffer.alloc(buffer1.length);

  // Perform XOR operation on each byte
  for (let i = 0; i < buffer1.length; i++) {
    resultBuffer[i] = buffer1[i]! ^ buffer2[i]!;
  }

  return resultBuffer;
}

export const buffer1 = Buffer.from(hexStringInput1, "hex");
export const buffer2 = Buffer.from(hexStringInput2, "hex");
export const xorBufferResult = xorBuffers(buffer1, buffer2);
export const xorHexResult = xorBufferResult.toString("hex");
console.log(xorHexResult === xoredHexStringOutput); // true
