import { Notes } from "@prisma/client";
import prisma from "../config/database.js";

export async function create(data: Notes){
  await prisma.notes.create({
    data
  })
};

export async function findByIdAndTitle(userId: number, title: string){
  const note = await prisma.notes.findFirst({
    where:{
      userId,
      title
    }
  });

  return note;
};

export async function findAllNotes(userId: number){
  const notes = await prisma.notes.findMany({
    where:{
      userId
    }
  });

  return notes;
};

export async function findById(id: number){
  const note = await prisma.notes.findFirst({
    where:{
      id
    }
  });

  return note;
};

export async function deleteNoteById(id: number){
  await prisma.notes.delete({
    where:{
      id
    }
  })
}