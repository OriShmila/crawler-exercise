import { getPage } from "./procces-data/fetch-page.js";
import { JSDOM } from "jsdom";
import { fetchItemsData } from "./procces-data/fetch-items-data.js";
import { fetchRelatedsValues } from "./procces-data/fetch-related-values.js";
import { logger } from "../logger/logger.js";

const PAGINATION_PATH = "&_pgn=";

export const handelEbayDataCall = async (uri) => {
  let relatedValues = [];
  let itemsData = [];
  let itemPosition = 1;

  while (true) {
    const pageNumber = itemsData[itemsData.length - 1]?.position + 1 || 1;
    const page = await getPage(`${uri}${PAGINATION_PATH}${pageNumber}`);
    const domPage = new JSDOM(page);

    if (relatedValues.length <= 0 || pageNumber <= 1) {
      relatedValues = fetchRelatedsValues(domPage);
    }

    const items = fetchItemsData(domPage, itemPosition);

    if (items.length <= 0) {
      logger.info(`Crawler on ${uri} completed`);

      return { relatedValues, itemsData };
    }

    itemsData.push(...items);

    pageNumber++;
    itemPosition = itemsData[itemsData.length - 1]?.position + 1;
  }
};
