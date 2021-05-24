import { fetchDataFromNestedElements } from "./helper.js";
import { fetchDataFromElement } from "./fetch-item-data.js";
import { logger } from "../../logger/logger.js";

export const ItemsProperties = new Map([
  ["ITEMS_CLASS_NAME", ".s-item"],
  ["BOX_ITEMS_CLASS_NAME", ".srp-results"],
]);

export const fetchItemsData = (body, position) => {
  const items = body.window.document
    ?.querySelector(ItemsProperties.get("BOX_ITEMS_CLASS_NAME"))
    ?.querySelectorAll(ItemsProperties.get("ITEMS_CLASS_NAME"));

  logger.info("Items data fetched");

  return convertIntoItemsData(items, position, body);
};

const convertIntoItemsData = (items, position, body) =>
  fetchDataFromNestedElements(items, fetchDataFromElement, body, position);
