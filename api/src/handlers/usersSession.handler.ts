import { Request, Response, NextFunction } from "express";
import { ClientError } from "../utils/errors";
import { responseMessage } from "../utils/response";
import { serialize } from "cookie";

import registerUserController from "../controllers/users/session/registerUser.controller";
import loginUserController from "../controllers/users/session/loginUser.controller";

// signup
export const registerUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) throw new ClientError("Missing data");

    const userCreated = await registerUserController(username, email, password);

    return responseMessage(
      res,
      201,
      `The user ${userCreated.username} with the email ${userCreated.email} has been created`
    );
  } catch (error) {
    return next(error);
  }
};

// login
export const loginUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, password } = req.body;

    if (!id || !password) throw new ClientError("Missing data");

    const userToken = await loginUserController(id, password);

    if (!userToken) throw new Error("Token could not to be generated");

    const serialized = serialize("videogames_session_token", userToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
    return responseMessage(res, 200, serialized);
  } catch (error) {
    return next(error);
  }
};
