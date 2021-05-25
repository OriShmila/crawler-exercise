import { Router } from "express";
import { logger } from "../logger/logger.js";
import { handleEbayDataCall } from "../scripts/handle-ebay-data-call.js";

export const ebayApi = Router();

const ebayUri = process.env.EBAY_URI || "https://www.ebay.com/sch/i.html?_nkw=";
const PAGINATION_PATH = "&_pgn=";

ebayApi.get("/:search", async (req, res) => {
  logger.info("Get eBay data requested");

  try {
    const result = await handleEbayDataCall(
      ebayUri + req.params.search + PAGINATION_PATH
    );
    res.status(200).send(result);
  } catch {
    res.status(500);
  }
});
