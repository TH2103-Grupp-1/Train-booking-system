import crypto from "crypto";

const algorithm = "aes-256-cbc"
const secretKey = "LooOLisaISIXCoO02l12idxlcozPOIso"
const iv = crypto.randomBytes(16);

export const encrypt = (password) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  let encrypted = cipher.update(password, 'utf-8', 'hex');

  encrypted += cipher.final('hex');

  return encrypted;
}

export const decrypt = async (password) => {
  let decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, iv); 
  let decrypted = decipher.update(password, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');

  return decrypted;
}