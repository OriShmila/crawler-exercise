import {
  getTextFromElementByClassName,
  hasTextVisibleFrom,
  ElementsName,
} from "./helper.js";

const IMAGE_SRC_ATTRIBUTE = "src";
const LINK_PATH_ATTRIBUTE = "href";

export const ItemProperties = new Map([
  ["imageElement", "img"],
  ["TITLE_CLASS_NAME", ".s-item__title"],
  ["PRICE_CLASS_NAME", ".s-item__price"],
  ["SUBTITLE_CLASS_NAME", ".s-item__subtitle"],
  ["PURCHASE_OPTIONS_CLASS_NAME", ".s-item__purchase-options"],
  ["SHIPPING_CLASS_NAME", ".s-item__shipping"],
  ["SHIPS_FROM_CLASS_NAME", ".s-item__location"],
  ["RETURNS_CLASS_NAME", ".s-item__free-returns"],
  ["HOTNESS_CLASS_NAME", ".s-item__hotness"],
  ["SPONSORED_CLASS_NAME", ".s-item__sep"],
  ["INFO_CLASS_NAME", ".s-item__info"],
]);

export const fetchDataFromElement = (element, position, body) => {
  const data = {
    id: getIdOf(element),
    imageLink: element
      .querySelector(ElementsName.get("IMAGE"))
      ?.getAttribute(IMAGE_SRC_ATTRIBUTE),
    title: getTextFromElementByClassName(
      element,
      ItemProperties.get("TITLE_CLASS_NAME")
    ),
    subtitle: getTextFromElementByClassName(
      element,
      ItemProperties.get("SUBTITLE_CLASS_NAME")
    ),
    price: getTextFromElementByClassName(
      element,
      ItemProperties.get("PRICE_CLASS_NAME")
    ),
    purchase: getTextFromElementByClassName(
      element,
      ItemProperties.get("PURCHASE_OPTIONS_CLASS_NAME")
    ),
    shipping: getTextFromElementByClassName(
      element,
      ItemProperties.get("SHIPPING_CLASS_NAME")
    ),
    shipsFrom: getTextFromElementByClassName(
      element,
      ItemProperties.get("SHIPS_FROM_CLASS_NAME")
    ),
    returns: getTextFromElementByClassName(
      element,
      ItemProperties.get("RETURNS_CLASS_NAME")
    ),
    hotness: getTextFromElementByClassName(
      element,
      ItemProperties.get("HOTNESS_CLASS_NAME")
    ),
    sponsored: hasTextVisibleFrom(
      element.querySelector(ItemProperties.get("SPONSORED_CLASS_NAME")),
      ElementsName.get("TEXT_BOX"),
      body
    ),
  };

  if (
    Object.values(data).every((value) => value === undefined || value === "")
  ) {
    return null;
  }

  return {
    ...data,
    position: position,
    sponsored: data.sponsored === "" ? false : true,
  };
};

const getIdOf = (element) => {
  const linkProperty = element
    .querySelector(ItemProperties.get("INFO_CLASS_NAME"))
    .querySelector(ElementsName.get("LINK"))
    .getAttribute(LINK_PATH_ATTRIBUTE);

  return linkProperty.split("?")[0].split("/").pop();
};
