import { Request, Response } from "express";
import getGenresController from "../controllers/genres/getGenres.controller";

export const getGenresHandler = async (_req: Request, res: Response) => {
  try {
    const genres = await getGenresController();

    return res.status(200).json(genres);
  } catch (error) {
    return res.status(500).json(error);
  }
};
