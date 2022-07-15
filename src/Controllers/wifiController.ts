import { Wifi } from "@prisma/client";
import { Request, Response } from "express";

import * as wifiService from "../Services/wifiService.js"

export async function createWifi(req:Request, res: Response){
  const { userId } = res.locals;
  const body: Wifi = {...req.body, userId};
  await wifiService.insertWifi(body);
  return res.sendStatus(200);
};

export async function getAllWifi(req: Request, res: Response){
  const { userId } = res.locals;
  const wifi = await wifiService.getAllWifi(userId);
  return res.status(200).send(wifi);
};

export async function getWifi(req: Request, res: Response){
  const { id } = req.params
  const { userId } = res.locals;
  const wifi = await wifiService.getSpecificWifi(parseInt(id), userId);
  return res.status(200).send(wifi);
};

export async function deleteWifi(req: Request, res: Response){
  const { id } = req.params;
  const { userId } = res.locals;
  await wifiService.deleteWifi(parseInt(id), userId);
  return res.sendStatus(202);
}