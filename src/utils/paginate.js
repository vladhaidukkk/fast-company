export const paginate = (items, itemsOnPage, currentIndex) => {
  const startIndex = itemsOnPage * (currentIndex - 1);
  return [...items].splice(startIndex, itemsOnPage);
};
