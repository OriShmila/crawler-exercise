export const ElementsName = new Map([
  ["IMAGE", "img"],
  ["LINK", "a"],
  ["TEXT_BOX", "span"],
]);

export const fetchDataFromNestedElements = (
  elements,
  fetchDataFromElement,
  body,
  position
) => {
  const results = [];
  let elementPosition = position;

  elements?.forEach((child) => {
    const result = fetchDataFromElement(child, elementPosition, body);

    if (result !== null && result !== undefined) {
      results.push(result);
    }

    elementPosition++;
  });

  return results;
};

export const getTextFromElementByClassName = (element, className) =>
  element.querySelector(className)?.textContent;

export const getTextVisibleFrom = (element, identified, body) => {
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

export const hasTextVisibleFrom = (element, identified, body) => {
  [...fetchNestedElements(element, identified)[0]].map(
    (child) => body.window.getComputedStyle(child).display !== "none" && true
  );

  return false;
};

const getChildFrom = (element, identified) => {
  return identified === null
    ? element?.childNodes
    : element?.querySelectorAll(identified);
};
const fetchNestedElements = (element, identified = null) => {
  if (getChildFrom(element, identified).length <= 0) {
    return element;
  }

  const nestedElements = [];
  getChildFrom(element, identified).forEach((child) =>
    nestedElements.push(fetchNestedElements(child, identified))
  );

  return nestedElements;
};
