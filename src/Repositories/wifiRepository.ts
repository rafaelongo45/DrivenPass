import { Wifi } from "@prisma/client";

import prisma from "../config/database.js";

export async function insert(data: Wifi){
  await prisma.wifi.create({
    data
  });
};

export async function findAllWifi(userId: number){
  const notes = await prisma.wifi.findMany({
    where:{
      userId
    }
  });

  return notes;
};

export async function findById(id: number){
  const note = await prisma.wifi.findFirst({
    where:{
      id
    }
  });

  return note;
};

export async function deleteWifiById(id: number){
  await prisma.wifi.delete({
    where:{
      id
    }
  })
}