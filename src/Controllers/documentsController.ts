import { Documents } from "@prisma/client";
import { Request, Response } from "express";
import * as documentsService from "../Services/documentsService.js";

export async function createDocument(req: Request, res: Response){
  const { userId } = res.locals;
  const body : Documents = { ...req.body, userId};
  await documentsService.insertDocument(body);
  return res.sendStatus(201);
};

export async function findDocuments(req: Request, res: Response){
  const { userId } = res.locals;
  const documents = await documentsService.findAllDocuments(userId);
  return res.status(200).send(documents);
};

export async function findDocument(req: Request, res: Response){
  const { id } = req.params;
  const { userId } = res.locals;
  const document = await documentsService.findDocument(userId, parseInt(id));
  return res.status(200).send(document);
};

export async function deleteDocument(req: Request, res: Response){
  const { id } = req.params;
  const { userId } = res.locals;
  await documentsService.deleteDocument(parseInt(id), userId);
  return res.sendStatus(202);
};
