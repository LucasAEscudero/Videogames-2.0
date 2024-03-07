import { Router } from "express";
import {
  getUsersHandler,
  registerUserHandler,
  loginUserHandler,
  putUserHandler,
  deleteUserHandler,
} from "../handlers/users.handler";

const usersRouter = Router();

// users
usersRouter.get("/", getUsersHandler);
usersRouter.put("/", putUserHandler);
usersRouter.delete("/:id", deleteUserHandler);

// authentication
usersRouter.post("/auth/register", registerUserHandler);
usersRouter.post("/auth/login", loginUserHandler);

export default usersRouter;
