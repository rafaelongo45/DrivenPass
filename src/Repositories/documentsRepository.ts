import { Documents } from "@prisma/client";

import prisma from "../config/database.js";

export async function insert(data: Documents){
  await prisma.documents.create({
    data
  })
};

export async function findByIdAndTitle(userId: number, type: string){
  const document = await prisma.documents.findFirst({
    where:{
      userId,
      type
    }
  });

  return document;
};

export async function findAll(userId: number){
  const documents = await prisma.documents.findMany({
    where:{
      userId
    }
  });

  return documents;
}

export async function findOne(id: number){
  const document = await prisma.documents.findFirst({
    where:{
      id
    }
  });
  
  return document;
};

export async function deleteDocument(id: number){
  await prisma.documents.delete({
    where:{
      id
    }
  });
};