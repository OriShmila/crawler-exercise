import { JSDOM } from "jsdom";
import { fetchPage } from "./fetch-page.js";
import { extractItems } from "./procces-ebay-data/extract-items/extract-items.js";
import { extractRelatedProducts } from "./procces-ebay-data/extract-related-products/extract-related-products.js";
import { logger } from "../logger/logger.js";

const PAGINATION_PATH = "&_pgn=";

export const handleEbayDataCall = async (uri) => {
  let items = [];
  let relatedProducts = [];
  let pageNumber = 1;
  let hasItemsOnPage = true;

  while (hasItemsOnPage) {
    let itemPosition = getCurrentItemPosition(items);
    const page = await fetchPage(`${uri}${PAGINATION_PATH}${pageNumber}`);
    const domPage = new JSDOM(page);

    if (relatedProducts.length === 0 || pageNumber === 1) {
      relatedProducts = extractRelatedProducts(domPage);
    }

    const newItems = extractItems(domPage);

    if (newItems.length === 0) {
      hasItemsOnPage = false;
      break;
    }

    newItems.forEach((item) => {
      item.position = itemPosition++;
      items.push(item);
    });

    pageNumber++;
  }

  logger.info(`Crawler on ${uri} completed`);

  return { relatedProducts, items };
};

const getCurrentItemPosition = (items) => {
  const itemsLength = items.length;

  return itemsLength > 0 ? itemsLength : 1;
};
