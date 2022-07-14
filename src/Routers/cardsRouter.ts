import { Router } from "express";

import { cardSchema } from "../Schemas/cardSchema.js";
import validateSchema from "../Middlewares/schemaValidator.js";
import { createCard } from "../Controllers/cardsController.js";
import { validateToken } from "../Middlewares/tokenValidator.js";

const cardsRouter = Router();

cardsRouter.post("/create/card", validateToken, validateSchema(cardSchema), createCard);

export default cardsRouter;