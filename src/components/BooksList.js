import { Box } from '@mui/joy';
import Grid from '@mui/joy/Grid';
import { TablePagination } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { whiteText } from '../commonStyles';
import { selectCurrentUser } from '../store/reducers/userSlice';
import BookCard from './BookCard';

const BooksList = ({
  showAddBtn = false,
  showRemoveBtn = false,
  books,
  addBookHandler,
  removeBookHandler,
  total,
  page,
  itemsPerPage,
  handleChangeRowsPerPage,
  handlePageChange,
}) => {
  const currentUser = useSelector(selectCurrentUser);

  const [transformedIcon, setTransformedIcon] = useState(null);

  const handleTransformIcon = (book) => {
    setTransformedIcon(book.id);
    setTimeout(() => setTransformedIcon(null), 1000);
    addBookHandler(book);
  };

  return (
    <>
      <Grid
        container
        spacing={3}
        sx={{ display: 'flex', alignItems: 'stretch' }}
      >
        {books?.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            showAddBtn={showAddBtn}
            showRemoveBtn={showRemoveBtn}
            handleTransformIcon={handleTransformIcon}
            removeBookHandler={removeBookHandler}
            transformedIcon={transformedIcon}
            currentUser={currentUser}
          />
        ))}
      </Grid>
      <Box
        display="flex"
        justifyContent="center"
        padding={2}
        sx={{
          '.MuiTablePagination-root': {
            border: '0 !important',
            ...whiteText,
          },
          '.MuiSvgIcon-root': {
            ...whiteText,
          },
        }}
      >
        <TablePagination
          component="div"
          count={total}
          page={page}
          rowsPerPage={itemsPerPage}
          rowsPerPageOptions={[10, 20, 40]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onPageChange={handlePageChange}
        />
      </Box>
    </>
  );
};

export default BooksList;
