import express from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes/index.routes";
import axios from "axios";
import type { ClientError, FetchError } from "./utils/errors";
import { errorResponse } from "./utils/response";

import { Request, Response, NextFunction } from "express";

import dotenv from "dotenv";
dotenv.config();

const server = express();

server.use(express.json());
server.use(morgan("dev"));
server.use(cors());

axios.defaults.baseURL = "https://api.rawg.io/api";

server.use("/", routes);

// error handler
server.use(
  (
    err: ClientError | FetchError,
    _req: Request,
    res: Response,
    _next: NextFunction
  ): void => {
    errorResponse(res, err.statusCode, err.message);
  }
);

export default server;
