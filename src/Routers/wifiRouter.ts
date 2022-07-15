import { Router } from "express";

import { wifiSchema } from "../Schemas/wifiSchema.js";
import validateSchema from "../Middlewares/schemaValidator.js";
import { validateToken } from "../Middlewares/tokenValidator.js";
import { createWifi, deleteWifi, getAllWifi, getWifi } from "../Controllers/wifiController.js";

const wifiRouter = Router();

wifiRouter.post("/create/wifi", validateToken, validateSchema(wifiSchema), createWifi);
wifiRouter.get("/find/wifi", validateToken, getAllWifi);
wifiRouter.get("/find/wifi/:id", validateToken, getWifi);
wifiRouter.delete("/delete/wifi/:id", validateToken, deleteWifi);

export default wifiRouter;