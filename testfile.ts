import { decryptAES128ECB, decryptionKey, encryptedBase64Content } from '@/solutions/set-1-challenge-7';

const decryptedMessage = decryptAES128ECB(encryptedBase64Content, decryptionKey);

console.log(decryptedMessage)
