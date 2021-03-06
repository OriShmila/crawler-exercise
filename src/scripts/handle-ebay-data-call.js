import { logger } from "../logger/logger.js";
import { promiseByInterval } from "../utils/promise-by-interval.js";
import { orderItems } from "./order-items.js";
import { extractData } from "./procces-ebay-data/extract-data.js";
import { addPositionFor } from "./add-position.js";

export const handleEbayDataCall = async (uri) => {
  let pageNumber = 1;
  const results = new Map();

  try {
    await promiseByInterval(async (interval, resolve) => {
      const currentPageNumber = pageNumber++;
      const result = await extractData(uri, currentPageNumber);

      if (result === null) {
        logger.info(
          `Crawler on ${uri} completed page ${currentPageNumber} is empty`
        );

        clearInterval(interval);
        return resolve();
      }

      results.set(currentPageNumber, result);
    }, 3000);
  } catch (error) {
    logger.error("Fetched eBay data faild", error);
    throw error;
  }

  return {
    relatedProducts: results.get(1)?.relatedProducts,
    items: addPositionFor(orderItems(results)),
  };
};
