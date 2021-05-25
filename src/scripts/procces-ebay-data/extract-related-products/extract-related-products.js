import {
  extractDataFromNestedElements,
  ElementNames,
} from "../../../utils/element-extractions.js";
import { logger } from "../../../logger/logger.js";

const RelatedSelectors = {
  RELATED_SEARCH_CLASS_NAME: ".srp-related-searches",
};

export const extractRelatedProducts = (page) => {
  const relatedProducts = extractDataFromNestedElements(
    page.window.document
      .querySelector(RelatedSelectors.RELATED_SEARCH_CLASS_NAME)
      ?.querySelectorAll(ElementNames.LINK),
    (element) => element.textContent
  );

  logger.info("Relateds products where extracted");
  return relatedProducts;
};
