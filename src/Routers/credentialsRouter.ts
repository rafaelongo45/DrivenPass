import { Router } from "express";

import validateSchema from "../Middlewares/schemaValidator.js";
import { validateToken } from "../Middlewares/tokenValidator.js";
import { credentialSchema } from "../Schemas/credentialSchema.js";
import { createCredential } from "../Controllers/credentialsController.js";

const credentialsRouter = Router();

credentialsRouter.post("/create/credential", validateToken, validateSchema(credentialSchema), createCredential);

export default credentialsRouter;