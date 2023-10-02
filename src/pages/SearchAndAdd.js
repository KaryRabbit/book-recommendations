import Search from '@mui/icons-material/Search';
import { Box, Button, CircularProgress } from '@mui/joy';
import { InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { alignCenter, stylesForInput } from '../commonStyles';
import ResultPage from '../components/ResultPage';
import { fetchBooks } from '../services/books.service';
import { selectIsLoading } from '../store/reducers/loaderSlice';

const SearchAndAddPage = () => {
  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const isLoading = useSelector(selectIsLoading);
  const [searchString, setSearchString] = useState('');
  const searchHandler = async () => {
    getBooks(searchString, page, itemsPerPage);
  };

  const handlePaginationChange = (newPage, newRowsPerPage) => {
    setPage(newPage);
    setItemsPerPage(newRowsPerPage);
    getBooks(searchString, newPage, newRowsPerPage);
  };

  const getBooks = async (searchString, page, itemsPerPage) => {
    const books = await fetchBooks(searchString, page, itemsPerPage);

    if (books?.books) {
      const updatedArray = books.books.map((book) => {
        return {
          id: book.id,
          ...book.volumeInfo,
        };
      });
      setTotal(books.total);
      setBooks(updatedArray);
    } else {
      setTotal(0);
      setBooks([]);
    }
  };

  const handleSearchChange = (event) => {
    setSearchString(event.target.value);
  };

  return isLoading ? (
    <Box sx={alignCenter}>
      <CircularProgress
        color="neutral"
        variant="soft"
        sx={{ '--CircularProgress-size': '80px' }}
      />
    </Box>
  ) : (
    <>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}
      >
        <TextField
          label="Search for a book"
          sx={stylesForInput}
          onKeyDown={(ev) => {
            if (ev.key === 'Enter') {
              searchHandler();
            }
          }}
          variant="outlined"
          size="medium"
          fullWidth
          value={searchString}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Button
          disabled={!searchString.length}
          onClick={searchHandler}
          color="neutral"
          size="lg"
          variant="soft"
          sx={{ marginLeft: '1rem' }}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ paddingTop: '3rem' }}>
        <ResultPage
          books={books}
          total={total}
          onPaginationChange={handlePaginationChange}
          page={page}
          itemsPerPage={itemsPerPage}
        />
      </Box>
    </>
  );
};
export default SearchAndAddPage;
