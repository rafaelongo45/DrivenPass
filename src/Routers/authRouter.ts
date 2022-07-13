import { Router } from "express";

import { authSchema } from "../Schemas/authSchema.js";
import { createUser, signin } from "../Controllers/authController.js";
import validateSchema from "../Middlewares/schemaValidator.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(authSchema), createUser);
authRouter.post("/sign-in", validateSchema(authSchema), signin);

export default authRouter;