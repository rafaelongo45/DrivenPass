import { NextFunction, Request, Response } from "express";

import { findSessionByToken } from "../Repositories/authRepository.js";

async function getSessionByToken(token: string){
  const session = await findSessionByToken(token);

  if(!session){
    throw { type: "notFound", message: "There isn't a session created with this token", code: 404 }
  }

  if(!session.isValid){
    throw { type: "expiredError", message: "Token is not valid anymore. Create a new session!", code: 403}
  }

  return session;
};

export async function validateToken(req: Request, res: Response, next: NextFunction){
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer', '').trim();

  if(!token){
    throw { type: "authError", message: "Token not sent", code: 403 }
  }

  const session = await getSessionByToken(token);
  res.locals.userId = session.userId;
  next();
};