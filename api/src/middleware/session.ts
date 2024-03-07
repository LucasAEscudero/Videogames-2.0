import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utils/jwt";
import { Request, Response, NextFunction } from "express";
import { getErrorName } from "../utils/errors";

export const checkToken = (
  req: Request & { user?: JwtPayload | string },
  res: Response,
  next: NextFunction
) => {
  try {
    const jwtByUser = req.headers.authorization || "";
    const jwt = jwtByUser.split(" ").pop();

    const isUser = verifyToken(`${jwt}`);
    req.user = isUser;

    next();
  } catch (error) {
    const name: string = getErrorName(error);
    if (name === "TokenExpiredError") res.status(401).send("Session expired");
    else if (name === "JsonWebTokenError")
      res.status(401).send("Invalid token");
    else res.status(400).send("Invalid session");
  }
};
