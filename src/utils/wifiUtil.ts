import Cryptr from "cryptr";
import { Wifi } from "@prisma/client";

export function decryptPassword(wifi: Wifi){
  const cryptr = new Cryptr(process.env.CRYPTR_KEY);
  const decryptedPassword = cryptr.decrypt(wifi.password);
  const decryptedWifi = {...wifi, password: decryptedPassword}
  return decryptedWifi;
};

export function decryptAllPasswords(wifi: Wifi[]){
  const decryptedWifis = wifi.map((wifi: Wifi) => {
   return decryptPassword(wifi)
  });
  return decryptedWifis;
}