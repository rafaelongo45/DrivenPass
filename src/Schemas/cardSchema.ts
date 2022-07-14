import joi from "joi";
import { Cards } from "@prisma/client";

export const cardSchema = joi.object<Cards>({
  number: joi.string().min(13).pattern(/^[0-9]+$/).required(),
  name: joi.string().required(),
  password: joi.number().required(),
  securityCode: joi.number().required(),
  expiration: joi.string().pattern(/^[0-1]{1}[0-9]{1}\/[0-9]{2}$/).required(),
  isVirtual: joi.boolean().required(),
  type: joi.string().valid('crédito', 'débito', 'ambos').required(),
  title: joi.string().required()
})