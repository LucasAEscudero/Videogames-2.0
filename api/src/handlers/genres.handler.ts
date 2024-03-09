import { NextFunction, Request, Response } from "express";
import { responseData } from "../utils/response";

import getGenresController from "../controllers/getGenres.controller";

export const getGenresHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const genres = await getGenresController();

    return responseData(res, 200, genres);
  } catch (error) {
    return next(error);
  }
};
