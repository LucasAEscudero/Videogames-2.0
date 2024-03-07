import { Router } from "express";
import videogamesRouter from "./videogames.routes";
import genresRouter from "./genres.routes";
import platformsRouter from "./platforms.routes";
import usersRouter from "./users.routes";

const router = Router();

router.use("/videogames", videogamesRouter);
router.use("/genres", genresRouter);
router.use("/platforms", platformsRouter);
router.use("/users", usersRouter);

export default router;
