import { Router } from "express";

import { noteSchema } from "../Schemas/noteSchema.js";
import validateSchema from "../Middlewares/schemaValidator.js";
import { validateToken } from "../Middlewares/tokenValidator.js";
import { createNote, deleteNote, getAllNotes, getNote } from "../Controllers/notesController.js";

const notesRouter = Router();

notesRouter.post("/create/note", validateToken, validateSchema(noteSchema), createNote);
notesRouter.get("/find/notes", validateToken, getAllNotes);
notesRouter.get("/find/note/:id", validateToken, getNote);
notesRouter.delete("/delete/note/:id", validateToken, deleteNote);

export default notesRouter;