import { fetchDataFromNestedElements, ElementsName } from "./helper.js";
import { logger } from "../../logger/logger.js";

const relatedsProperties = new Map([
  ["relatedSearchClassName", ".srp-related-searches"],
]);

export const fetchRelatedsValues = (body) => {
  const relateds = fetchDataFromNestedElements(
    body.window.document
      .querySelector(relatedsProperties.get("relatedSearchClassName"))
      ?.querySelectorAll(ElementsName.get("LINK")),
    (element) => element.textContent
  );

  logger.info("relateds value fetched");
  return relateds;
};
