import bcrypt from "bcrypt"

export async function encryptPassword(password: string){
  const SALT = 10;
  const encryptedPassword: string = bcrypt.hashSync(password, SALT);
  return encryptedPassword;
}