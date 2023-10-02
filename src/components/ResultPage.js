import { Box, Typography } from '@mui/joy';
import React from 'react';
import { useDispatch } from 'react-redux';
import { alignCenter } from '../commonStyles';
import BooksList from '../components/BooksList';
import { showSnackbar } from '../store/reducers/snackbarSlice';
import { addToLibrary, removeFromLibrary } from '../store/reducers/userSlice';

const ResultPage = (props) => {
  const searchResults = props.books;
  const total = props.total;
  const page = props.page;
  const itemsPerPage = props.itemsPerPage;
  const dispatch = useDispatch();

  const handlePageChange = (event, newPage) => {
    props.onPaginationChange(newPage, itemsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    const newPage = Math.floor((page * itemsPerPage) / newRowsPerPage);
    props.onPaginationChange(newPage, newRowsPerPage);
  };

  const addBookHandler = (book) => {
    dispatch(
      showSnackbar({ message: 'Book Added To Library!', severity: 'success' })
    );
    dispatch(addToLibrary(book));
  };

  const removeBookHandler = (book) => {
    dispatch(
      showSnackbar({
        message: 'Book Removed From Library!',
        severity: 'info',
      })
    );
    dispatch(removeFromLibrary(book));
  };

  let content;
  if (searchResults?.length) {
    content = (
      <BooksList
        books={searchResults}
        total={total}
        page={page}
        itemsPerPage={itemsPerPage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        addBookHandler={addBookHandler}
        handlePageChange={handlePageChange}
        removeBookHandler={removeBookHandler}
        showAddBtn={true}
      />
    );
  } else {
    content = (
      <Box sx={alignCenter}>
        <Typography level="title-lg" component="div" textColor="white">
          Start your search to discover amazing books!
        </Typography>
      </Box>
    );
  }
  return content;
};

export default ResultPage;
