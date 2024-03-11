import { Router } from "express";
import {
  getVideogamesHandler,
  getVideogamesByIdHandler,
} from "../handlers/videogames.handler";

const videogamesRouter = Router();

videogamesRouter.get("/", getVideogamesHandler);
videogamesRouter.get("/:id", getVideogamesByIdHandler);

// videogamesRouter.post("/");

// videogamesRouter.put("/");

// videogamesRouter.delete("/");

export default videogamesRouter;
