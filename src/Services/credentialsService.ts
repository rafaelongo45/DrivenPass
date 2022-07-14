import Cryptr from "cryptr";
import dotenv from "dotenv";
import { Credentials } from "@prisma/client";

import * as credentialsRepository from "../Repositories/credentialsRepository.js";
import { decryptAllPasswords, decryptPassword } from "../utils/credentialsUtil.js";

dotenv.config();

async function checkCredential(credential: Credentials, userId: number){
  if(!credential){
    throw { type: "credentialError", message: "Credential with this id does not exist", code: 404 };
  }

  const isCredentialFromUser = credential.userId === userId;

  if(!isCredentialFromUser){
    throw { type: "credentialError", message: "This credential does not belong to this user", code: 403 };
  }
}

async function allCredentials(userId: number){
  const credentials = await credentialsRepository.getAllCredentials(userId);
  return credentials;
}

async function findByUserIdAndTitle(userId: number, title: string){
  const credential = await credentialsRepository.getByUserIdAndTitle(userId, title);

  if(credential){
    throw { type: "credentialError", message: "Credential with this title for this user already exists", code: 409 };
  }
};

async function encryptCredentialPassword(data: Credentials){
  const cryptr = new Cryptr(process.env.CRYPTR_KEY);
  const encryptedPassword = cryptr.encrypt(data.password);

  const insertData = {...data, password: encryptedPassword};
  return insertData;
};

export async function create(data: Credentials){
  await findByUserIdAndTitle(data.userId, data.title);
  const insertData = await encryptCredentialPassword(data);
  await credentialsRepository.insert(insertData)
};

export async function getAllUserCredentials(userId: number){
  const credentials = await allCredentials(userId);
  const decryptedCredentials = decryptAllPasswords(credentials);
  return decryptedCredentials;
};

export async function getSpecificCredential(credentialId: number, userId: number){
  const credential = await credentialsRepository.getCredentialById(credentialId);
  await checkCredential(credential, userId);
  const decryptedCredential = decryptPassword(credential);
  return decryptedCredential;
}