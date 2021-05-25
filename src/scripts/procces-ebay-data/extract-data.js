import { JSDOM } from "jsdom";
import { fetchPage } from "../fetch-page.js";
import { extractItems } from "./extract-items/extract-items.js";
import { extractRelatedProducts } from "./extract-related-products/extract-related-products.js";
import { logger } from "../../logger/logger.js";

export const extractData = async (uri, pageNumber) => {
  let relatedProducts = [];
  const page = await fetchPage(`${uri}${pageNumber}`);
  const domPage = new JSDOM(page);

  if (pageNumber === 1) {
    relatedProducts = extractRelatedProducts(domPage);
  }

  const items = extractItems(domPage);

  if (items.length === 0 && relatedProducts.length === 0) {
    return null;
  }

  logger.info(`Data where extracted for page: ${pageNumber}`);
  return { items, relatedProducts };
};
