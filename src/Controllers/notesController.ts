import { Notes } from "@prisma/client";
import { Request, Response } from "express";

import * as notesService from "../Services/notesService.js";

export async function createNote(req: Request, res: Response){
  const { userId } = res.locals;
  const body : Notes = {...req.body, userId};
  await notesService.insertNote(body);
  return res.sendStatus(201);
};

export async function getAllNotes(req: Request, res: Response){
  const { userId } = res.locals;
  const notes = await notesService.getllNotes(userId);
  return res.status(200).send(notes);
};

export async function getNote(req: Request, res: Response){
  const { id } = req.params
  const { userId } = res.locals;
  const note = await notesService.getSpecificNote(parseInt(id), userId);
  return res.status(200).send(note);
};

export async function deleteNote(req: Request, res: Response){
  const { id } = req.params;
  const { userId } = res.locals;
  await notesService.deleteNote(parseInt(id), userId);
  return res.sendStatus(202);
}