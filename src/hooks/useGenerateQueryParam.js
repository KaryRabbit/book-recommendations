import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUserLibrary } from '../store/reducers/userSlice';

const useGenerateQueryParam = () => {
  const library = useSelector(selectCurrentUserLibrary);
  const [queryParam, setQueryParam] = useState('');

  useEffect(() => {
    if (library && library.length > 0) {
      const randomBook = library[Math.floor(Math.random() * library.length)];

      const detailKeys = Object.keys(randomBook);
      const randomDetailKey =
        detailKeys[Math.floor(Math.random() * detailKeys.length)];

      let newQueryParam;
      if (randomDetailKey === 'author') {
        newQueryParam = `+inauthor:${randomBook.author}`;
      } else if (randomDetailKey === 'genre') {
        newQueryParam = `+subject:${randomBook.genre}`;
      }

      setQueryParam(newQueryParam);
    }
  }, [library]);

  return queryParam;
};

export default useGenerateQueryParam;
