import { NextFunction, Request, Response } from "express";
import { responseData } from "../utils/response";

import getPlatformsController from "../controllers/getPlatforms.controller";

export const getPlatformsHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const platforms = await getPlatformsController();

    return responseData(res, 200, platforms);
  } catch (error) {
    return next(error);
  }
};
