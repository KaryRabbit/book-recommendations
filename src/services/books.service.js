import instance from '../axios.js';

export const fetchBooks = async (searchString, page, itemsPerPage) => {
  const response = await instance.get('/volumes', {
    params: {
      q: searchString,
      startIndex: page,
      maxResults: itemsPerPage,
      langRestrict: 'en',
    },
  });

  return response?.data
    ? { books: response?.data.items, total: response.data.totalItems }
    : null;
};

export const fetchRandomBooks = async (queryParam, page, itemsPerPage) => {
  const response = await instance.get(`/volumes?q=${queryParam}`, {
    params: {
      startIndex: page,
      maxResults: itemsPerPage,
      langRestrict: 'en',
    },
  });
  return response?.data
    ? { books: response?.data.items, total: response.data.totalItems }
    : null;
};
