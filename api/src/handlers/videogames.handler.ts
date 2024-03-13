import { NextFunction, Request, Response } from "express";
import { ClientError } from "../utils/errors";
import { responseVideogamesData, responseData } from "../utils/response";
import { videogamesQuerysType, videogamesResponseType } from "../utils/types";

import getVideogamesController from "../controllers/videogames/getVideogames.controller";
import getVideogameByIdController from "../controllers/videogames/getVideogameById.controller";

export const getVideogamesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, ...extraQuerys } = req.query;

    if (!page) throw new ClientError("Missing page query");

    const data: videogamesResponseType = await getVideogamesController(
      Number(page),
      extraQuerys as videogamesQuerysType
    );

    return responseVideogamesData(res, 200, data);
  } catch (error) {
    return next(error);
  }
};

export const getVideogamesByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) throw new ClientError("Missing identifier param");
    else if (!Number(id)) throw new ClientError("Id sould be a number");

    const videogamesDetails = await getVideogameByIdController(Number(id));

    return responseData(res, 200, videogamesDetails);
  } catch (error) {
    return next(error);
  }
};
