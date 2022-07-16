import joi from "joi";

import { Users } from "@prisma/client";

interface UserData extends Users {
  confirmPassword: string
}

export const authSchema = joi.object<UserData>({
  email: joi.string().email().required(),
  password: joi.string().min(10).required(),
  confirmPassword: joi.ref('password')
})