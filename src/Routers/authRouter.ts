import { Router } from "express";

import { signupSchema } from "../Schemas/signupSchema.js";
import { createUser } from "../Controllers/authController.js";
import validateSchema from "../Middlewares/schemaValidator.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signupSchema), createUser)

export default authRouter;