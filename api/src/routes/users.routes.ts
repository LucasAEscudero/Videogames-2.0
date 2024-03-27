import { Router } from "express";
import { auth } from "../middleware/session";
import {
  registerUserHandler,
  loginUserHandler,
} from "../handlers/usersSession.handler";
import {
  getUsersHandler,
  putUserHandler,
  deleteUserHandler,
} from "../handlers/users.handler";
import {
  getUserVideogamesHandler,
  postUserVideogameHandler,
  deleteUserVideogameHandler,
} from "../handlers/usersLibrary.handler";

const usersRouter = Router();

// general - admin
usersRouter.get("/", getUsersHandler);
usersRouter.delete("/", deleteUserHandler);

// authentication
usersRouter.post("/signup", registerUserHandler);
usersRouter.post("/login", loginUserHandler);

// users profile
usersRouter.put("/", auth, putUserHandler);

// library
usersRouter.get("/library", auth, getUserVideogamesHandler);
usersRouter.post("/library/:videogame", auth, postUserVideogameHandler);
usersRouter.delete("/library/:videogame", auth, deleteUserVideogameHandler);

export default usersRouter;
