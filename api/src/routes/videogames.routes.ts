import { Router } from "express";
import {
  getVideogamesHandler,
  getVideogamesByHandler,
} from "../handlers/videogames.handler";

const videogamesRouter = Router();

videogamesRouter.get("/", getVideogamesHandler);
videogamesRouter.get("/:id", getVideogamesByHandler);

// videogamesRouter.post("/");

// videogamesRouter.put("/");

// videogamesRouter.delete("/");

export default videogamesRouter;
