import { Router } from "express";
import { getPlatformsHandler } from "../handlers/platforms.handler";

const platformsRouter = Router();

platformsRouter.get("/", getPlatformsHandler);

export default platformsRouter;
