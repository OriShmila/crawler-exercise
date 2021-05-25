export const ElementNames = {
  IMAGE: "img",
  LINK: "a",
  TEXT_BOX: "span",
};

export const ElementsAttributes = {
  IMAGE_SRC: "src",
  LINK_PATH: "href",
};

export const extractDataFromNestedElements = (
  elements,
  extractDataFromElement,
  page
) => {
  const results = [];

  elements?.forEach((child) => {
    const result = extractDataFromElement(child, page);

    if (result !== null && result !== undefined) {
      results.push(result);
    }
  });

  return results;
};

export const getTextFromElementBySelector = (element, selector) =>
  element.querySelector(selector)?.textContent;

export const getTextVisibleInside = (element, selector, page) => {
  let text = "";

  fetchNestedElements(element, identified)[0].forEach(
    (child) =>
      (text +=
        body.window.getComputedStyle(child).display === "none"
          ? ""
          : child.textContent)
  );

  return text;
};
const getChildFrom = (element, selector) =>
  selector === null ? element?.childNodes : element?.querySelectorAll(selector);

const extractNestedElements = (element, descendantSelector = null) => {
  const children = getChildFrom(element, descendantSelector);
  if (children.length === 0) {
    return element;
  }

  return [...children].map((child) =>
    extractNestedElements(child, descendantSelector)
  );
};
