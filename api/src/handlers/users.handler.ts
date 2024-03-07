import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errors";
import getUsersController from "../controllers/users/getUsers.controller";
import registerUserController from "../controllers/users/registerUser.controller";
import loginUserController from "../controllers/users/loginUser.controller";
import putUserController from "../controllers/users/putUser.controller";
import deleteUserController from "../controllers/users/deleteUser.controller";
import postUserVideogameController from "../controllers/users/postUserVideogame.controller";

// users
export const getUsersHandler = async (_req: Request, res: Response) => {
  try {
    const users = await getUsersController();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const putUserHandler = async (req: Request, res: Response) => {
  try {
    const { id, username, email, password } = req.body;

    if (!id || !username || !email || !password)
      throw new Error("Missing data");

    await putUserController(id, username, email, password);

    return res.status(200).json({ message: "The user has been edited" });
  } catch (error) {
    return res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const deleteUserHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error("Missing id");

    await deleteUserController(id);

    return res.status(200).json({ message: "The user has been deleted" });
  } catch (error) {
    return res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const postUserVideogameHandler = async (req: Request, res: Response) => {
  try {
    const { id, videogameId } = req.body;

    const { error } = await postUserVideogameController(id, videogameId);

    if (error) res.status(400).send("The user was not finded");

    return res
      .status(201)
      .send(`The game with the id ${videogameId} was added at user library`);
  } catch (error) {
    return res.status(500).json({ error: getErrorMessage(error) });
  }
};

// authentication
export const registerUserHandler = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) throw new Error("Missing data");

    const userCreated = await registerUserController(username, email, password);

    return res.status(201).json({
      message: `The user ${userCreated.username} with the email ${userCreated.email} has been created`,
    });
  } catch (error) {
    return res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const loginUserHandler = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) throw new Error("Missing data");

    const user = await loginUserController(username, email, password);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: getErrorMessage(error) });
  }
};
