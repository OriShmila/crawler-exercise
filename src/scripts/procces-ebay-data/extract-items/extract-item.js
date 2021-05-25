import {
  getTextFromElementBySelector,
  getTextVisibleInside,
  ElementNames,
  ElementsAttributes,
} from "../../../utils/element-extractions.js";
import { ItemSelectors } from "./selectors.js";

export const extractDataFromItem = (element, page) => {
  const data = {
    id: getIdOf(element),
    imageLink: element
      .querySelector(ElementNames.IMAGE)
      ?.getAttribute(ElementsAttributes.IMAGE_SRC),
    title: getTextFromElementBySelector(
      element,
      ItemSelectors.TITLE_CLASS_NAME
    ),
    subtitle: getTextFromElementBySelector(
      element,
      ItemSelectors.SUBTITLE_CLASS_NAME
    ),
    price: getTextFromElementBySelector(
      element,
      ItemSelectors.PRICE_CLASS_NAME
    ),
    purchase: getTextFromElementBySelector(
      element,
      ItemSelectors.PURCHASE_OPTIONS_CLASS_NAME
    ),
    shipping: getTextFromElementBySelector(
      element,
      ItemSelectors.SHIPPING_CLASS_NAME
    ),
    shipsFrom: getTextFromElementBySelector(
      element,
      ItemSelectors.SHIPS_FROM_CLASS_NAME
    ),
    returns: getTextFromElementBySelector(
      element,
      ItemSelectors.RETURNS_CLASS_NAME
    ),
    hotness: getTextFromElementBySelector(
      element,
      ItemSelectors.HOTNESS_CLASS_NAME
    ),
    sponsored: getTextVisibleInside(
      element.querySelector(ItemSelectors.SPONSORED_CLASS_NAME),
      ElementNames.TEXT_BOX,
      page
    ),
  };

  if (
    Object.values(data).every((value) => value === undefined || value === "")
  ) {
    return null;
  }

  return {
    ...data,
    sponsored: Boolean(data.sponsored) ? true : false,
  };
};

const getIdOf = (element) => {
  const link = element
    .querySelector(ItemSelectors.INFO_CLASS_NAME)
    .querySelector(ElementNames.LINK)
    .getAttribute(ElementsAttributes.LINK_PATH);

  return link.split("?")[0].split("/").pop();
};
