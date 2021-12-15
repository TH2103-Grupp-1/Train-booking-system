import crypto from "crypto";

const algorithm = "osIk1^rcczs-*"
const secretKey = "LooOLisaISIXCoO02l12idxlcozPOIösoq"
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex')
  };
}