import { Router } from "express";

import validateSchema from "../Middlewares/schemaValidator.js";
import { validateToken } from "../Middlewares/tokenValidator.js";
import { credentialSchema } from "../Schemas/credentialSchema.js";
import { createCredential, findAllCredentials, findSpecificCredential } from "../Controllers/credentialsController.js";

const credentialsRouter = Router();

credentialsRouter.post("/create/credential", validateToken, validateSchema(credentialSchema), createCredential);
credentialsRouter.get("/find/credential", validateToken, findAllCredentials);
credentialsRouter.get("/find/credential/:id", validateToken, findSpecificCredential);

export default credentialsRouter;