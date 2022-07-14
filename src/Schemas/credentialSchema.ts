import joi from "joi";

import { Credentials } from "@prisma/client";

export const credentialSchema =  joi.object<Credentials>({
  title: joi.string().required(),
  username: joi.string().required(),
  url: joi.string().uri().required(),
  password: joi.string().required()
})