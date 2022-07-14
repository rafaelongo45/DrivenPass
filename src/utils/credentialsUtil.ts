import Cryptr from "cryptr";
import { Credentials } from "@prisma/client";

export function decryptPassword(credential: Credentials){
  const cryptr = new Cryptr(process.env.CRYPTR_KEY);
  const decryptedPassword = cryptr.decrypt(credential.password);
  const decryptedCredential = {...credential, password: decryptedPassword}
  return decryptedCredential;
}

export function decryptAllPasswords(credentials: Credentials[]){
  const decryptedCredentials = credentials.map((credential: Credentials) => {
   return decryptPassword(credential)
  });
  return decryptedCredentials;
}