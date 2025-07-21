import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

// 24Pet1tNt9UVhNCN6FKjeKK3AEU3qvVoSqIUUbxuOEc=
const algorithm = 'aes-256-cbc';
const ivLength = 16;

const keyBase64 = process.env.ENCRYPTION_KEY;
if (!keyBase64) {
  throw new Error("ENCRYPTION_KEY não definida no .env");
}

const key = Buffer.from(keyBase64, 'base64');
if (key.length !== 32) {
  throw new Error("A chave de criptografia deve ter exatamente 32 bytes para AES-256-CBC.");
}

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;

  // exemplo de retorno: 'd3689f760158871578bfd03c01bb7613:4696a1c36becdeb2534efcfb856020d640d59070c57b8d1a5ddf93c817deaae1'
}

export function decrypt(data: string): string {
  const [ivHex, encryptedText] = data.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
