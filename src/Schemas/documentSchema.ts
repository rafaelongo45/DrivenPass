import joi from "joi";

export const documentSchema = joi.object({
  name: joi.string().required(),
  issuedAt: joi.string().required(),
  number: joi.number().required(),
  expiration: joi.string().required(),
  issuedBy: joi.string().required(),
  type: joi.string().valid('RG', 'CNH').required()
})