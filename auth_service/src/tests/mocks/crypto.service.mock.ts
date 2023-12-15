import * as crypto from 'crypto';

export class CryptoServiceMock {
  private readonly algorithm = 'aes-128-cbc';
  // private readonly key = Buffer.from('1234567891234Manh', 'utf-8');
  private readonly key = crypto
    .createHash('sha256')
    .update('123456789', 'utf-8')
    .digest()
    .slice(0, 16);
  private readonly iv = crypto.randomBytes(16);
  encrypt(text: string): string {
    // Mock the encrypt method
    return 'mocked-encrypted-text';
  }

  decrypt(encryptedText: string): string {
    // Mock the decrypt method
    return 'mocked-decrypted-text';
  }
}
