import prisma from "../config/database.js";

export async function findByEmail(email: string){
  const user = prisma.users.findUnique({
    where:{
      email
    }
  });

  return user
};

export async function insert(email: string, password: string){
  await prisma.users.create({
    data:{
      email,
      password
    }
  });
};

export async function createSession(userId: number, token: string){
  await prisma.sessions.create({
    data: {
      userId,
      token
    }
  });
};

export async function findSessionByToken(token: string){
  const session = await prisma.sessions.findFirst({
    where:{
      token
    }
  });

  return session;
};
