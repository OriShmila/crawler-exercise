import { Router } from "express";
import { logger } from "../logger/logger.js";
import { handleEbayDataCall } from "../scripts/handle-ebay-data-call.js";

export const ebayApi = Router();

const ebayUri = process.env.EBAY_URI || "https://www.ebay.com/sch/i.html?_nkw=";

ebayApi.get("/:search", async (req, res) => {
  logger.info("Get Ebay data requested");

  try {
    const result = await handleEbayDataCall(ebayUri + req.params.search);
    res.status(200).send(result);
  } catch {
    res.status(500);
  }
});
