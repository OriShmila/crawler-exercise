import request from "request-promise";
import { logger } from "../logger/logger.js";

export const fetchPage = async (uri) => {
  const options = {
    url: uri,
    method: "GET",
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
    },
  };

  let result = null;

  try {
    result = await request(options);

    logger.info(`Page ${uri} fetched`);
  } catch (error) {
    logger.error(`error occured while hitting URI`, error);

    throw error;
  }

  return result;
};
