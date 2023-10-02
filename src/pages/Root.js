import { Alert, Box, Container, Snackbar } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainNavigation from '../components/MainNavigation';
import { hideSnackbar } from '../store/reducers/snackbarSlice';

const RootLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector((state) => state.snackbar);

  const handleClose = () => {
    dispatch(hideSnackbar());
  };
  return (
    <>
      <MainNavigation />
      <main>
        <Container style={{ maxWidth: '80%' }}>
          <Box
            sx={{
              height: 'calc(100vh - 70px - 6rem)',
              backgroundColor: 'rgb(51, 56, 77, .6)',
              padding: '3rem',
              maxWidth: '80vw',
            }}
          >
            {children}
          </Box>
        </Container>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      </main>
    </>
  );
};

export default RootLayout;
