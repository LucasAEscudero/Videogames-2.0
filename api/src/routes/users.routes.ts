import { Router } from "express";
import {
  getUsersHandler,
  registerUserHandler,
  loginUserHandler,
  putUserHandler,
  deleteUserHandler,
  postUserVideogameHandler,
} from "../handlers/users.handler";
import { checkToken } from "../middleware/session";

const usersRouter = Router();

// users
usersRouter.get("/", getUsersHandler);
usersRouter.post("/", postUserVideogameHandler);
usersRouter.put("/", checkToken, putUserHandler);
usersRouter.delete("/:id", deleteUserHandler);

// authentication
usersRouter.post("/signup", registerUserHandler);
usersRouter.post("/login", loginUserHandler);

export default usersRouter;
