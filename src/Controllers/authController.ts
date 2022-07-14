import { Users } from "@prisma/client";
import { Request, Response } from "express";

import * as authService from "../Services/authService.js";

export async function createUser(req: Request, res: Response){
  const body: Users = req.body;
  await authService.create(body);
  return res.sendStatus(201);
};

export async function signin(req: Request, res: Response){
  const body: Users = req.body;
  const data = await authService.signin(body);
  return res.status(200).send(data);
}