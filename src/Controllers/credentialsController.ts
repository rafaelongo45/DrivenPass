import { Request, Response } from "express";
import { Credentials } from "@prisma/client";

import { create } from "../Services/credentialsService.js";

export async function createCredential(req: Request, res: Response){
  const { userId } = res.locals;
  const body: Credentials = {...req.body, userId};
  await create(body);
  return res.sendStatus(201);
}