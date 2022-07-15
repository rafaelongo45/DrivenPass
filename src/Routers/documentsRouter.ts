import { Router } from "express";

import { documentSchema } from "../Schemas/documentSchema.js";
import validateSchema from "../Middlewares/schemaValidator.js";
import { validateToken } from "../Middlewares/tokenValidator.js";
import * as documentsController from "../Controllers/documentsController.js"

const documentsRouter = Router();

documentsRouter.post("/create/document", validateToken, validateSchema(documentSchema), documentsController.createDocument);
documentsRouter.get("/find/document", validateToken, documentsController.findDocuments);
documentsRouter.get("/find/document/:id", validateToken, documentsController.findDocument);
documentsRouter.delete("/delete/document/:id", validateToken, documentsController.deleteDocument);

export default documentsRouter;