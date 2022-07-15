import { Request, Response } from "express";
import { Credentials } from "@prisma/client";

import { create, deleteCredential, getAllUserCredentials, getSpecificCredential } from "../Services/credentialsService.js";

export async function createCredential(req: Request, res: Response){
  const { userId } = res.locals; //TODO: Como tipar o res.locals?
  const body: Credentials = {...req.body, userId};
  await create(body);
  return res.sendStatus(201);
};

export async function findAllCredentials(req: Request, res: Response){
  const { userId } = res.locals;
  const userCredentials = await getAllUserCredentials(userId);
  return res.status(200).send(userCredentials);
};

export async function findCredential(req: Request, res: Response){
  const { id } = req.params;  //TODO: Recebendo como string. Como tipar essa brincadeira aí??
  const { userId } = res.locals;
  const credential = await getSpecificCredential(parseInt(id), userId);
  return res.status(200).send(credential);
};

export async function deleteUserCredential(req: Request, res: Response){
  const { id } = req.params;
  const { userId } = res.locals;
  await deleteCredential(parseInt(id), userId);
  return res.sendStatus(202);
}