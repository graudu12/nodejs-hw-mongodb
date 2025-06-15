export const filterParams = (query) => {
  const { contactType, isFavourite } = query;
  return {
    contactType,
    isFavourite,
  };
};
