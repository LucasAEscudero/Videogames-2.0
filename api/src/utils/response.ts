import { Response } from "express";
import {
  UserType,
  videogameType,
  genresApiType,
  platformsApiType,
  videogamesResponseType,
} from "./types";

export function responseData(
  res: Response,
  status: number,
  data:
    | string[]
    | UserType[]
    | videogameType
    | genresApiType[]
    | platformsApiType[]
) {
  res.status(status).json({
    error: false,
    data,
  });
}

export function responseVideogamesData(
  res: Response,
  status: number,
  results: videogamesResponseType
) {
  res.status(status).json({
    error: false,
    data: results,
  });
}

export function responseMessage(
  res: Response,
  status: number,
  message: string
) {
  res.status(status).json({
    error: false,
    message,
  });
}

export function errorResponse(res: Response, status = 400, message: string) {
  res.status(status).json({
    error: true,
    message: message,
  });
}
