import { Response } from "express";
import { arraysTypes, videogameType } from "./types";

// interface responseType {
//   error: boolean;
//   message?: string;
//   data?: arraysTypes;
// }

export function responseData(
  res: Response,
  status: number,
  data: arraysTypes | videogameType
) {
  res.status(status).json({
    error: false,
    data,
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
