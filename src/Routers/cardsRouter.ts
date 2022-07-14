import { Router } from "express";

import { cardSchema } from "../Schemas/cardSchema.js";
import validateSchema from "../Middlewares/schemaValidator.js";
import { validateToken } from "../Middlewares/tokenValidator.js";
import { createCard, getAllCards, getCard } from "../Controllers/cardsController.js";

const cardsRouter = Router();

cardsRouter.post("/create/card", validateToken, validateSchema(cardSchema), createCard);
cardsRouter.get("/find/cards", validateToken, getAllCards);
cardsRouter.get("/find/card/:id", validateToken, getCard);

export default cardsRouter;