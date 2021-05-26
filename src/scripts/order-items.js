export const orderItems = (results) => {
  const items = [];
  let index = 1;
  let hasMoreItems = true;

  while (hasMoreItems) {
    let currentItems = results.get(index++)?.items || [];

    if (currentItems.length === 0) {
      hasMoreItems = false;
      return items;
    }

    items.push(...currentItems);
  }

  logger.info(`Items ordered`);
};
