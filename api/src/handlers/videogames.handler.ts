import { NextFunction, Request, Response } from "express";
import { ClientError } from "../utils/errors";
import { responseData } from "../utils/response";

import getVideogamesController from "../controllers/videogames/getVideogames.controller";
import getVideogameByIdController from "../controllers/videogames/getVideogameById.controller";
import getVideogameByNameController from "../controllers/videogames/getVideogameByName.controller";

export const getVideogamesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page } = req.query;

    if (!page) throw new ClientError("Missing page query");

    const videogames = await getVideogamesController(Number(page));

    return responseData(res, 200, videogames);
  } catch (error) {
    return next(error);
  }
};

export const getVideogamesByHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) throw new ClientError("Missing identifier param");

    if (Number(id)) {
      const videogamesDetails = await getVideogameByIdController(Number(id));

      return responseData(res, 200, videogamesDetails);
    } else {
      const videogames = await getVideogameByNameController(id);

      return responseData(res, 200, videogames);
    }
  } catch (error) {
    return next(error);
  }
};
