import { Cards } from "@prisma/client";
import { Request, Response } from "express";

import { deleteCard, findAllCards, findUserCard, insertCard } from "../Services/cardsService.js";

export async function createCard(req: Request, res: Response){
  const { userId } = res.locals;
  const body : Cards = { ...req.body, userId};
  await insertCard(body);
  return res.sendStatus(201);
};

export async function getAllCards(req: Request, res: Response){
  const { userId } = res.locals;
  const cards = await findAllCards(userId);
  return res.status(200).send(cards);
};

export async function getCard(req: Request, res: Response){
  const { id } = req.params;
  const { userId } = res.locals;
  const card = await findUserCard(userId, parseInt(id));
  return res.status(200).send(card);
};

export async function deleteUserCard(req: Request, res: Response){
  const { id } = req.params;
  const { userId } = res.locals;
  await deleteCard(userId, parseInt(id));
  return res.sendStatus(200);
}