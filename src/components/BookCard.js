import { BookmarkAdd, BookmarkRemove } from '@mui/icons-material';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import React from 'react';

import {
  AspectRatio,
  Card,
  CardContent,
  CardOverflow,
  Grid,
  IconButton,
  Typography,
} from '@mui/joy';
import { bookDescription, bookmarkIcon } from '../commonStyles';
const BookCard = ({
  book,
  showAddBtn,
  showRemoveBtn,
  handleTransformIcon,
  removeBookHandler,
  transformedIcon,
  currentUser,
}) => {
  return (
    <Grid xs={12} sm={12} md={6} lg={6} key={book.id} sx={{ display: 'flex' }}>
      <Card
        orientation="horizontal"
        sx={{
          height: 200,
          width: '100%',
          overflow: 'hidden',
          resize: 'both',
          position: 'relative',
        }}
      >
        {showAddBtn && (
          <IconButton
            disabled={!currentUser}
            onClick={(e) => {
              handleTransformIcon(book);
            }}
            sx={bookmarkIcon}
          >
            <BookmarkAddedIcon
              sx={{
                position: 'absolute',
                opacity: transformedIcon === book.id ? 1 : 0,
                color: 'grey',
              }}
            />
            <BookmarkAdd
              sx={{
                position: 'absolute',
                opacity: transformedIcon === book.id ? 0 : 1,
              }}
            />
          </IconButton>
        )}
        {showRemoveBtn && (
          <IconButton
            disabled={!currentUser}
            onClick={() => {
              removeBookHandler(book);
            }}
            sx={bookmarkIcon}
          >
            <BookmarkRemove />
          </IconButton>
        )}

        <CardOverflow>
          <AspectRatio
            flex
            ratio="1"
            sx={{
              minWidth: 130,
              maxHeight: 182,
              padding: '1rem',
              borderRadius: 10,
            }}
          >
            <img
              style={{ width: 'auto' }}
              src={book.imageLinks?.thumbnail || '../assets/books.jpg'}
              loading="lazy"
              alt={book.title}
            />
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <Typography level="title-lg" component="div" sx={{ width: '85%' }}>
            {book.title}
          </Typography>
          <Typography level="body-xs">{book.authors?.join(', ')}</Typography>
          <Typography sx={bookDescription} level="body-md">
            {book.description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default BookCard;
