import joi from "joi";

import { Notes } from "@prisma/client";

export const noteSchema = joi.object<Notes>({
  title: joi.string().max(50).required(),
  message: joi.string().max(1000).required()
})