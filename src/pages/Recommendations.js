import ShuffleIcon from '@mui/icons-material/Shuffle';
import { Box, Button, CircularProgress, Typography } from '@mui/joy';
import React, { useCallback, useEffect, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { alignCenter } from '../commonStyles';
import BooksList from '../components/BooksList';
import { fetchBooks } from '../services/books.service';
import { selectIsLoading } from '../store/reducers/loaderSlice';
import { showSnackbar } from '../store/reducers/snackbarSlice';
import {
  addToLibrary,
  selectCurrentUserLibrary,
} from '../store/reducers/userSlice';

const RecommendationsPage = () => {
  const userLibrary = useSelector(selectCurrentUserLibrary);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [books, setBooks] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [queryParam, setQueryParam] = useState('');
  const [triggerFetch, setTriggerFetch] = useState(true);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const randomQueries = [
    '+subject:fiction',
    '+subject:mystery',
    '+inauthor:Stephen King',
    '+subject:science',
  ];

  const keyDetails = userLibrary.map((book) => ({
    author: book.authors?.[0],
    title: book.title,
  }));

  const generateQueryParam = () => {
    let queryParam = '';

    if (userLibrary.length > 0) {
      const randomBook =
        keyDetails[Math.floor(Math.random() * keyDetails.length)];
      const randomDetailKey = Math.random() < 0.5 ? 'author' : 'genre';
      if (randomDetailKey === 'author' && randomBook.author) {
        queryParam = `+inauthor:${randomBook.author}`;
      } else if (randomBook.title) {
        queryParam = `+subject:${randomBook.title}`;
      }
    } else {
      queryParam =
        randomQueries[Math.floor(Math.random() * randomQueries.length)];
    }

    setQueryParam(queryParam);
  };

  useEffect(() => {
    generateQueryParam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (queryParam && triggerFetch) {
      fetchAndSetBooks(queryParam, page, itemsPerPage);
      setTriggerFetch(false);
    }
  }, [queryParam, page, itemsPerPage, triggerFetch]);

  const getRandomRecommendations = () => {
    unstable_batchedUpdates(() => {
      generateQueryParam();
      setPage(0);
      setTriggerFetch(true);
    });
  };

  const handlePageChange = useCallback(
    (event, newPage) => {
      setPage(newPage);
      fetchAndSetBooks(queryParam, newPage, itemsPerPage);
    },
    [queryParam, itemsPerPage]
  );

  const fetchAndSetBooks = async (searchString, page, itemsPerPage) => {
    const books = await fetchBooks(searchString, page, itemsPerPage);

    if (books?.books) {
      const updatedArray = books.books?.map((book) => {
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

  const handleChangeRowsPerPage = useCallback(
    (event) => {
      const newRowsPerPage = parseInt(event.target.value, 10);
      const newPage = Math.floor((page * itemsPerPage) / newRowsPerPage);
      setPage(newPage);
      setItemsPerPage(newRowsPerPage);
      fetchAndSetBooks(queryParam, newPage, newRowsPerPage);
    },
    [page, itemsPerPage, queryParam]
  );

  const addBookHandler = useCallback(
    (book) => {
      dispatch(
        showSnackbar({ message: 'Book Added To Library!', severity: 'success' })
      );
      dispatch(addToLibrary(book));
    },
    [dispatch]
  );

  let content;
  let btn = (
    <Button
      sx={{
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '3rem',
      }}
      size="lg"
      variant="soft"
      color="neutral"
      onClick={getRandomRecommendations}
      startDecorator={<ShuffleIcon />}
    >
      Get Random Recommendations
    </Button>
  );
  if (books?.length) {
    content = (
      <BooksList
        books={books}
        total={total}
        page={page}
        itemsPerPage={itemsPerPage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        addBookHandler={addBookHandler}
        handlePageChange={handlePageChange}
        showAddBtn={true}
        removeBookHandler={undefined}
      />
    );
  } else {
    content = (
      <Box sx={alignCenter}>
        <Typography level="title-lg" component="div" textColor="white">
          No results found, try again
        </Typography>
      </Box>
    );
  }
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
      {btn}
      {content}
    </>
  );
};

export default RecommendationsPage;
