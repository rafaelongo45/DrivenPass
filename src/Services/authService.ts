import * as authRepository from "../Repositories/authRepository.js";
import { decryptPassword, encryptPassword, generateToken } from "../utils/authUtil.js";

async function userExists(email: string){
  const user = await authRepository.findByEmail(email);
  const hasUser = user.length !== 0 

  if(hasUser){
    throw { type: "authError", message: "E-mail already registered", code: 409 };
  }
};

async function insertUser(email: string, password: string){
  await authRepository.insert(email, password);
};

async function getUser(email: string, password: string){
  const [user] = await authRepository.findByEmail(email);

  if(!user){
    throw { type: "authError", message: "E-mail not registered", code: 404 };
  }

  const isPasswordCorrect = await decryptPassword(password, user.password);

  if(!isPasswordCorrect){
    throw { type: "authError", message: "Incorrect password", code: 403 };
  }

  return user;
};

export async function create(body: authRepository.User){
  const { email, password } = body;
  await userExists(email);
  const encryptedPassword = encryptPassword(password);
  await insertUser(email, encryptedPassword);
};

export async function signin(body: authRepository.User){
  const { email, password } = body;
  const user = await getUser(email, password);
  const token = generateToken(body);
  await authRepository.createSession(user.id, token);
  return { token };
};

