export const addPositionFor = (array) => {
  const elementPosition = 1;

  array.forEach((element) => {
    element.position = elementPosition++;
    array.push(element);
  });
};
