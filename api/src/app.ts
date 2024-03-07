import express from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes/index.routes";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const server = express();

server.use(express.json());
server.use(morgan("dev"));
server.use(cors());

axios.defaults.baseURL = "https://api.rawg.io/api";

server.use("/", routes);

export default server;
