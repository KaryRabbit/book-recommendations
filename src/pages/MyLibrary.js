import { Box, Typography } from '@mui/joy';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alignCenter } from '../commonStyles';
import BooksList from '../components/BooksList';
import { showSnackbar } from '../store/reducers/snackbarSlice';
import {
  removeFromLibrary,
  selectCurrentUserLibrary,
} from '../store/reducers/userSlice';

const INFO_MESSAGE = 'Book Removed From Library!';
const DEFAULT_ITEMS_PER_PAGE = 10;

const MyLibraryPage = () => {
  const userLibrary = useSelector(selectCurrentUserLibrary);
  const total = userLibrary.length;
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const dispatch = useDispatch();

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const booksToShow = userLibrary.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    const newPage = Math.floor((page * itemsPerPage) / newRowsPerPage);
    setItemsPerPage(newRowsPerPage);
    setPage(newPage);
  };

  const removeBookHandler = (book) => {
    dispatch(
      showSnackbar({
        message: INFO_MESSAGE,
        severity: 'info',
      })
    );
    dispatch(removeFromLibrary(book));
  };

  return userLibrary.length ? (
    <BooksList
      books={booksToShow}
      total={total}
      page={page}
      itemsPerPage={itemsPerPage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      handlePageChange={handlePageChange}
      showRemoveBtn={true}
      removeBookHandler={removeBookHandler}
      addBookHandler={undefined}
    />
  ) : (
    <Box sx={alignCenter}>
      <Typography level="title-lg" component="div" textColor="white">
        Your Library is empty.
      </Typography>
    </Box>
  );
};

export default MyLibraryPage;
