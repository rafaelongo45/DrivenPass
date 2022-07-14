import { Notes } from "@prisma/client";

import { create, deleteNoteById, findAllNotes, findById, findByIdAndTitle } from "../Repositories/notesRepository.js";

async function checkNote(note: Notes, userId: number){
  if(!note){
    throw { type: "noteError", message: "Note with this id doesn't exist", code: 404};
  }

  const belongsToUser = note.userId === userId;

  if(!belongsToUser){
    throw { type: "noteError", message: "This note does not belong to this user", code: 401 };
  }
}

async function hasNote(data: Notes){
  const note = await findByIdAndTitle(data.userId, data.title);

  if(note){
    throw { type: "noteError", message: "User already has a note with this title", code: 409 };
  }
};

export async function insertNote(data: Notes){
  await hasNote(data);
  await create(data);
};

export async function getllNotes(userId: number){
  const notes = await findAllNotes(userId);
  return notes;
}

export async function getSpecificNote(noteId: number, userId: number){
  const note = await findById(noteId);
  await checkNote(note, userId);
  return note;
}

export async function deleteNote(noteId: number, userId: number){
  const note = await findById(noteId);
  await checkNote(note, userId);
  await deleteNoteById(noteId);
}