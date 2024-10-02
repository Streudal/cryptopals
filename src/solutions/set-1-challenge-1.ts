function isHexString(value: string) {
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

  // If both checks pass, return isValid as true with no error message
  return {
    isValid: true
  }
}

function hexStringToByteArray(hexString: string) {
  return hexString.match(/.{1,2}/g);
}

function byteArrayToCharCodeArray(byteArray: RegExpMatchArray) {
  return byteArray.map((byte) => String.fromCharCode(parseInt(byte, 16)));
}

function hexToBase64(hexString: string) {
  // Check if the string is a valid hexadecimal string
  const validatedHexString = isHexString(hexString);

  if (!validatedHexString.isValid) {
    throw new Error(validatedHexString.errorMsg);
  }

  // Convert hex string to binary string
  const byteArray = hexStringToByteArray(hexString);

  if (!byteArray) {
    throw new Error('Byte Array is null!');
  }

  const charCodeArray = byteArrayToCharCodeArray(byteArray);
  const binaryString = charCodeArray.join('');

  // Encode binary string to base64
  const base64String = btoa(binaryString);

  return base64String;
}

const hexStringInput = "49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d";

hexToBase64(hexStringInput); // Should output the base64 string: SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t
