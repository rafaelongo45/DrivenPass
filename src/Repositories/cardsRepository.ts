import { Cards } from "@prisma/client";

import prisma from "../config/database.js";

export async function insert(data: Cards){
  await prisma.cards.create({
    data
  });
};

export async function findAllUserCards(userId: number){
  const cards = await prisma.cards.findMany({
    where:{
      userId
    }
  });

  return cards;
};

export async function findByTitleAndId(userId: number, title: string){
  const card = await prisma.cards.findFirst({
    where:{
      userId,
      title
    }
  })
  
  return card;
}

export async function findSpecificCard(id: number){
  const card = await prisma.cards.findFirst({
    where:{
      id
    }
  });

  return card;
};

export async function deleteCardById(id: number){
  await prisma.cards.delete({
    where:{
      id
    }
  });
};

