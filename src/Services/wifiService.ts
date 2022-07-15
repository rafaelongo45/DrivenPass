import Cryptr from "cryptr";
import dotenv from "dotenv";
import { Wifi } from "@prisma/client";

import { deleteWifiById, findAllWifi, findById, insert } from "../Repositories/wifiRepository.js";

dotenv.config();

async function checkWifi(wifi: Wifi, userId: number){
  if(!wifi){
    throw { type: "wifiError", message: "Wifi with this id doesn't exist", code: 404};
  }

  const belongsToUser = wifi.userId === userId;

  if(!belongsToUser){
    throw { type: "wifiError", message: "This wifi does not belong to this user", code: 401 };
  }
}

async function encryptWifiPassword(data: Wifi){
  const cryptr = new Cryptr(process.env.CRYPTR_KEY);
  const encryptedPassword = cryptr.encrypt(data.password);

  const insertData = {...data, password: encryptedPassword};
  return insertData;
};

export async function insertWifi(body: Wifi){
  const encryptedBody = await encryptWifiPassword(body);
  await insert(encryptedBody);
};

export async function getAllWifi(userId: number){
  const notes = await findAllWifi(userId);
  return notes;
}

export async function getSpecificWifi(wifiId: number, userId: number){
  const wifi = await findById(wifiId);
  await checkWifi(wifi, userId);
  return wifi;
}

export async function deleteWifi(wifiId: number, userId: number){
  const wifi = await findById(wifiId);
  await checkWifi(wifi, userId);
  await deleteWifiById(wifiId);
}