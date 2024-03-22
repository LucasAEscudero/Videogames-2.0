import { NextFunction, Request, Response } from "express";
import { serialize } from "cookie";
import { responseData, responseMessage } from "../utils/response";
import { ClientError } from "../utils/errors";

import getUsersController from "../controllers/users/getUsers.controller";
import registerUserController from "../controllers/users/registerUser.controller";
import loginUserController from "../controllers/users/loginUser.controller";
import putUserController from "../controllers/users/putUser.controller";
import deleteUserController from "../controllers/users/deleteUser.controller";
import postUserVideogameController from "../controllers/users/postUserVideogame.controller";

// users
export const getUsersHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getUsersController();

    return responseData(res, 200, users);
  } catch (error) {
    return next(error);
  }
};

export const putUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, username, email, password } = req.body;

    if (!id || !username || !email || !password)
      throw new ClientError("Missing data");

    await putUserController(id, username, email, password);

    return responseMessage(res, 200, "The user has been edited succesfully");
  } catch (error) {
    return next(error);
  }
};

export const deleteUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) throw new ClientError("Missing id");

    await deleteUserController(id);

    return responseMessage(res, 200, "The user has been deleted succesfully");
  } catch (error) {
    return next(error);
  }
};

export const postUserVideogameHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, videogameId } = req.body;

    await postUserVideogameController(id, videogameId);

    return responseMessage(
      res,
      201,
      `The game with the id ${videogameId} was added at user library`
    );
  } catch (error) {
    return next(error);
  }
};

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
