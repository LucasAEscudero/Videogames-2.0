import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utils/jwt";
import { Request, Response, NextFunction } from "express";
import { getErrorName } from "../utils/errors";
import { errorResponse } from "../utils/response";
import { RequestSessionType } from "../utils/types";

export const auth = (
  req: Request & { user?: JwtPayload | string },
  res: Response,
  next: NextFunction
) => {
  try {
    const jwtByUser = req.headers.authorization || "";
    const jwt = jwtByUser.split(" ").pop();

    const isUser = verifyToken(`${jwt}`);
    (req as RequestSessionType).user = isUser;

    next();
  } catch (error) {
    const name: string = getErrorName(error);
    if (name === "TokenExpiredError")
      errorResponse(res, 401, "Session expired");
    else if (name === "JsonWebTokenError")
      errorResponse(res, 401, "Invalid token");
    else errorResponse(res, 400, "Invalid session");
  }
};
