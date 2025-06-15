const parseSortBy = (value) => {
  if (typeof value === 'undefined') {
    return '_id';
  }
  const keys = [
    '_id',
    'name',
    'phoneNumber',
    'contactType',
    'createdAt',
    'updatedAt',
  ];
  if (!keys.includes(value)) {
    return '_id';
  }

  return value;
};
const parseSortOrder = (value) => {
  if (typeof value === 'undefined') {
    return 'asc';
  }
  if (value !== 'asc' && value !== 'desc') {
    return 'asc';
  }
  return value;
};
export const sortParams = (query) => {
  const { sortBy, sortOrder } = query;
  const parsedSortBy = parseSortBy(sortBy);
  const parsedSortOrder = parseSortOrder(sortOrder);
  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};
