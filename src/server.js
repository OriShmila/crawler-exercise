import express from "express";
import { ebayApi } from "./api/ebay-data.js";
import { logger } from "./logger/logger.js";

const port = process.env.PORT || 3000;

const server = express();

server.use("/ebay-data", ebayApi);

server.listen(port, () => logger.info(`Server listening on port ${port}`));
