import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { Users } from "@prisma/client";

dotenv.config();

export function encryptPassword(password: string){
  const SALT = 10;
  const encryptedPassword: string = bcrypt.hashSync(password, SALT);
  return encryptedPassword;
};

export async function decryptPassword(password: string, userPassword: string){
  const isPasswordCorrect: boolean = await bcrypt.compare(password, userPassword);
  return isPasswordCorrect
};

export function generateToken(user: Users){
  const token = jwt.sign(user, process.env.JWT_KEY);
  return token;
}