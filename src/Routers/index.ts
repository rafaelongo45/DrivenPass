import { Router } from "express";

import authRouter from "./authRouter.js";
import wifiRouter from "./wifiRouter.js";
import notesRouter from "./notesRouter.js";
import cardsRouter from  "./cardsRouter.js";
import documentsRouter from "./documentsRouter.js";
import credentialsRouter from "./credentialsRouter.js";

const router = Router();

router.use(authRouter);
router.use(credentialsRouter);
router.use(notesRouter);
router.use(cardsRouter);
router.use(wifiRouter);
router.use(documentsRouter);

export default router;