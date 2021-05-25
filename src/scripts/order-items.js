export const orderItems = (results) => {
  const items = [];
  let index = 1;
  let hasMorItems = true;

  while (hasMorItems) {
    let itemPosition = getCurrentItemPosition(items);
    let currentItems = results.get(index++)?.items || [];

    if (currentItems.length === 0) {
      hasMorItems = false;
      return items;
    }

    currentItems.forEach((item) => {
      item.position = itemPosition++;
      items.push(item);
    });
  }

  logger.info(`Items ordered`);
};

const getCurrentItemPosition = (items) => {
  const itemsLength = items.length;

  return itemsLength > 0 ? itemsLength : 1;
};
