import Cryptr from "cryptr";
import dotenv from "dotenv";
import { Cards } from "@prisma/client";

import * as cardRepository from "../Repositories/cardRepository.js";

dotenv.config();

async function encryptData(data: Cards){
  const cryptr = new Cryptr(process.env.CRYPTR_KEY);
  const encryptedPassword: string = cryptr.encrypt(data.password);

  const encryptedData = { ...data, password: encryptedPassword};
  return encryptedData;
}

export async function insertCard(data: Cards){
  const encryptedData = await encryptData(data);

  await cardRepository.insert(encryptedData);
}