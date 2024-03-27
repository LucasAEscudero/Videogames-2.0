import { NextFunction, Request, Response } from "express";
import { responseData, responseMessage } from "../utils/response";
import { ClientError } from "../utils/errors";
import { RequestSessionType } from "../utils/types";

import getUsersController from "../controllers/users/getUsers.controller";
import putUserController from "../controllers/users/putUser.controller";
import deleteUserController from "../controllers/users/deleteUser.controller";

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
  req: RequestSessionType,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;
    const { id } = req.user;

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
