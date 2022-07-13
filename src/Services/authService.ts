import * as authRepository from "../Repositories/authRepository.js";
import { encryptPassword } from "../utils/authUtil.js";

async function userExists(email: string){
  const user = await authRepository.findByEmail(email);
  const hasUser = user.length !== 0 
  if(hasUser){
    throw { type: "authError", message: "E-mail already registered", code: 409};
  }
}

async function insertUser(email: string, password: string){
  await authRepository.insert(email, password);
}

export async function create(body: authRepository.User){
  const { email, password } = body;
  await userExists(email);
  const encryptedPassword = await encryptPassword(password);
  await insertUser(email, encryptedPassword);
}