import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errors";
import getVideogamesController from "../controllers/videogames/getVideogames.controller";
import getVideogameByIdController from "../controllers/videogames/getVideogameById.controller";
import getVideogameByNameController from "../controllers/videogames/getVideogameByName.controller";

export const getVideogamesHandler = async (req: Request, res: Response) => {
  try {
    const { page } = req.query;

    if (!page) throw new Error("Missing page");

    const videogames = await getVideogamesController(Number(page));

    return res.status(200).json(videogames);
  } catch (error) {
    return res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const getVideogamesByHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error("Missing identifier param");

    if (Number(id)) {
      console.log(id);
      const videogamesDetails = await getVideogameByIdController(Number(id));

      return res.status(200).json(videogamesDetails);
    } else {
      console.log(id);
      const videogames = await getVideogameByNameController(id);

      return res.status(200).json(videogames);
    }
  } catch (error) {
    return res.status(500).json({ error: getErrorMessage(error) });
  }
};
