export const addPositionFor = (array) => {
  let elementPosition = 1;

  return array.map((element) => ({ ...element, position: elementPosition++ }));
};
