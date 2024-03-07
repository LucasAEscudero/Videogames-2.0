import { Request, Response } from "express";
import getPlatformsController from "../controllers/platforms/getPlatforms.controller";

export const getPlatformsHandler = async (_req: Request, res: Response) => {
  try {
    const platforms = await getPlatformsController();

    return res.status(200).json(platforms);
  } catch (error) {
    return res.status(500).json(error);
  }
};
