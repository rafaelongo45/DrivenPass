import Cryptr from "cryptr";
import dotenv from "dotenv";

import * as credentialsRepository from "../Repositories/credentialsRepository.js";
import { Credential } from "../Repositories/credentialsRepository.js";

dotenv.config();

async function findByUserIdAndTitle(userId: number, title: string){
  const [credential] = await credentialsRepository.getByUserIdAndTitle(userId, title);

  if(credential){
    throw { type: "credentialError", message: "Credential with this title for this user already exists", code: 409 };
  }
};

async function encryptCredentialPassword(data: Credential){
  const cryptr = new Cryptr(process.env.CRYPTR_KEY);
  const encryptedPassword = cryptr.encrypt(data.password);

  const insertData = {...data, password: encryptedPassword};
  return insertData;
}

export async function create(data: Credential){
  await findByUserIdAndTitle(data.userId, data.title);
  const insertData = await encryptCredentialPassword(data);
  await credentialsRepository.insert(insertData)
};