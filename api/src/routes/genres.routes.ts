import { Router } from "express";
import { getGenresHandler } from "../handlers/genres.handler";

const genresRouter = Router();

genresRouter.get("/", getGenresHandler);

export default genresRouter;
