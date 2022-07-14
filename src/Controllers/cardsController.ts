import { Cards } from "@prisma/client";
import { Request, Response } from "express";

import { insertCard } from "../Services/cardsService.js";

export async function createCard(req: Request, res: Response){
  const { userId } = res.locals;
  const body : Cards = { ...req.body, userId};
  await insertCard(body);
  return res.sendStatus(201);
};