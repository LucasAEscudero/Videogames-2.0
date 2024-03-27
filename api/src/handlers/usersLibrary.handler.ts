import { Response, NextFunction } from "express";
import { RequestSessionType } from "../utils/types";
import { ClientError } from "../utils/errors";
import { responseData, responseMessage } from "../utils/response";

import getUserVideogamesController from "../controllers/users/library/getUserVideogames.controller";
import postUserVideogameController from "../controllers/users/library/postUserVideogame.controller";
import deleteUserVideogameController from "../controllers/users/library/deleteUserVideogame.controller";

export const getUserVideogamesHandler = async (
  req: RequestSessionType,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user;

    const libraryVideogames = await getUserVideogamesController(id);

    if (!libraryVideogames)
      throw new ClientError(
        "The videogame with this id already existed in the library",
        404
      );

    return responseData(res, 200, libraryVideogames);
  } catch (error) {
    return next(error);
  }
};

export const postUserVideogameHandler = async (
  req: RequestSessionType,
  res: Response,
  next: NextFunction
) => {
  try {
    const { videogame } = req.params;
    const { id } = req.user;

    const added = await postUserVideogameController(id, videogame);

    if (!added)
      throw new ClientError(
        "The videogame with this id already existed in the library",
        404
      );

    return responseMessage(res, 201, `The game was added successfully`);
  } catch (error) {
    return next(error);
  }
};

export const deleteUserVideogameHandler = async (
  req: RequestSessionType,
  res: Response,
  next: NextFunction
) => {
  try {
    const { videogame } = req.params;
    const { id } = req.user;

    // console.log(videogame, id);
    const deleted = await deleteUserVideogameController(id, videogame);

    if (!deleted)
      throw new ClientError("The videogame with this id not exist", 404);

    return responseMessage(res, 200, `The game was deleted successfully`);
  } catch (error) {
    return next(error);
  }
};
