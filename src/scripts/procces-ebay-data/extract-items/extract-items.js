import { extractDataFromNestedElements } from "../../../utils/element-extractions.js";
import { extractDataFromItem } from "./extract-item.js";
import { ItemSelectors } from "./selectors.js";
import { logger } from "../../../logger/logger.js";

export const extractItems = (page) => {
  const itemElements = page.window.document
    ?.querySelector(ItemSelectors.BOX_ITEMS_CLASS_NAME)
    ?.querySelectorAll(ItemSelectors.ITEMS_CLASS_NAME);

  const items = extractDataFromNestedElements(
    itemElements,
    extractDataFromItem,
    page
  );

  logger.info("Items where extracted");

  return items;
};
