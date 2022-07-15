import joi from "joi";

import { Wifi } from "@prisma/client";

export const wifiSchema = joi.object<Wifi>({
  name: joi.string().required(),
  password: joi.string().required(),
  title: joi.string().required()
})