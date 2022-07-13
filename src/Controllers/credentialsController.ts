import { Request, Response } from "express";

import { create } from "../Services/credentialsService.js";
import { Credential } from "../Repositories/credentialsRepository.js";

export async function createCredential(req: Request, res: Response){
  const { userId } = res.locals;
  const body: Credential = {...req.body, userId};
  await create(body);
  return res.sendStatus(201);
}