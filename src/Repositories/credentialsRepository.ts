import { Credentials } from "@prisma/client";

import prisma from "../config/database.js";

export async function insert(data: Credentials){
  const { userId, title, url, username, password } = data;
  await prisma.credentials.create({
    data: {
      userId,
      title,
      url,
      username,
      password
    }
  });
};

export async function getByUserIdAndTitle(userId: number, title: string){
  const credential = await prisma.credentials.findFirst({
    where: {
      userId,
      title
    }
  });
  
  return credential;
};