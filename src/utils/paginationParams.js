const parseNumber = (value, defValue) => {
  if (typeof value === 'undefined') {
    return defValue;
  }
  const parsedValue = parseInt(value);
  return Number.isNaN(parsedValue) ? defValue : parsedValue;
};
export const paginationParams = (query) => {
  const { page, perPage } = query;
  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);
  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
