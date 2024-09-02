/**
 * Checks if a string is a valid hexadecimal string.
 * 
 * @param {string} value 
 */
function isHexString(value) {
  // Valid hexadecimal characters
  const hexRegex = /^[0-9a-fA-F]+$/;

  // Check if the string has an even length
  if (value.length % 2 !== 0) {
    return {
      isValid: false,
      errorMsg: 'Invalid hexadecimal string - length must be even!'
    }
  }

  // Check if the string matches the regex
  if (!hexRegex.test(value)) {
    return {
      isValid: false,
      errorMsg: 'Invalid hexadecimal string - contains invalid characters!'
    }
  }

  // If both checks pass, return isValid as true with an empty error message
  return {
    isValid: true
  }
}

function hexStringToByteArray(hexString) {
  return hexString.match(/.{1,2}/g);
}

function byteArrayToCharCodeArray(byteArray) {
  return byteArray.map((byte) => String.fromCharCode(parseInt(byte, 16)));
}

/**
 * Converts a hex string to a base64 string.
 * 
 * @param {string} hexString 
 */
function hexToBase64(hexString) {
  // Check if the string is a valid hexadecimal string
  const validatedHexString = isHexString(hexString);

  if (!validatedHexString.isValid) {
    throw new Error(validatedHexString.errorMsg);
  }

  // Convert hex string to binary string
  const byteArray = hexStringToByteArray(hexString);
  const charCodeArray = byteArrayToCharCodeArray(byteArray);
  const binaryString = charCodeArray.join('');

  // Encode binary string to base64
  const base64String = btoa(binaryString);

  return base64String;
}

const hexStringInput = "49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d";
const base64StringOutput = "SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t"
const base64String = hexToBase64(hexStringInput);
console.log('Set 1:', base64StringOutput === base64String);



const hexStringInput2 = "1c0111001f010100061a024b53535009181c";
const hexStringInput3 = "686974207468652062756c6c277320657965";
const xoredHexStringOutput = "746865206b696420646f6e277420706c6179"

/**
 * Performs a bitwise XOR operation on two buffers.
 * 
 * @param {Buffer} buffer1 
 * @param {Buffer} buffer2 
 */
function xorBuffers(buffer1, buffer2) {
  // Check if buffers are of equal length
  if (buffer1.length !== buffer2.length) {
    throw new Error('Buffers must be of equal length!');
  }

  // Create a buffer to hold the result
  const resultBuffer = Buffer.alloc(buffer1.length);

  // Perform XOR operation on each byte
  for (let i = 0; i < buffer1.length; i++) {
    resultBuffer[i] = buffer1[i] ^ buffer2[i];
  }

  return resultBuffer;
}

const buffer1 = Buffer.from(hexStringInput2, 'hex');
const buffer2 = Buffer.from(hexStringInput3, 'hex');
const xorBufferResult = xorBuffers(buffer1, buffer2);
const xorHexResult = xorBufferResult.toString('hex');
console.log('Set 2: ', xorHexResult === xoredHexStringOutput);



const hexStringInput4 = "1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736";
const asciiCharacters = Array.from({ length: 256 }, (_, i) => String.fromCharCode(i));

function asciiToHex(asciiChar) {
  // Convert ASCII character to hex string
  return asciiChar.charCodeAt(0).toString(16);
}

function padHexString(hexString, length, padStart, padChar = '0') {
  // Calculate the number of zeros needed for padding
  const paddingLength = length - hexString.length;

  // Create the padding of zeros
  const padding = padChar.repeat(Math.max(0, paddingLength));

  // Concatenate the padding with the hex string
  if (padStart === 'start') {
    return `${padding}${hexString}`;
  }

  return `${hexString}${padding}`;
}

function padBuffer(buffer, targetLength) {
  // Check if the target length is less than or equal to the original buffer length
  if (targetLength <= buffer.length) {
    return buffer;
  }

  // Create a new buffer with the target length, filled with zeros
  const paddedBuffer = Buffer.alloc(targetLength);

  // Copy the original buffer into the padded buffer
  buffer.copy(paddedBuffer);

  return paddedBuffer;
}

function hexToBytes(hex) {
  const bytes = [];
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.substr(i, 2), 16));
  }
  return bytes;
}

function xorBytesWithKey(bytes, character) {
  return bytes.map(byte => byte ^ character);
}

function scoreEnglishText(text) {
  // Scoring function to estimate how likely text is English
  const frequency = {
    'a': 0.0651738, 'b': 0.0124248, 'c': 0.0217339, 'd': 0.0349835, 'e': 0.1041442,
    'f': 0.0197881, 'g': 0.0158610, 'h': 0.0492888, 'i': 0.0558094, 'j': 0.0009033,
    'k': 0.0050529, 'l': 0.0331490, 'm': 0.0202124, 'n': 0.0564513, 'o': 0.0596302,
    'p': 0.0137645, 'q': 0.0008606, 'r': 0.0497563, 's': 0.0515760, 't': 0.0729357,
    'u': 0.0225134, 'v': 0.0082903, 'w': 0.0171272, 'x': 0.0013692, 'y': 0.0145984,
    'z': 0.0007836, ' ': 0.1918182
  };

  return text.toLowerCase().split('').reduce((acc, char) => acc + (frequency[char] || 0), 0);
}

function decryptXorCipher(hex) {
  let bestScore = 0;
  let bestPlaintext = '';
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
    plaintext: bestPlaintext
  }
}

const decryptedXorCipher = decryptXorCipher(hexStringInput4);
console.log('Set 3: ', `Key: ${decryptedXorCipher.character}, Plaintext: ${decryptedXorCipher.plaintext}`);
