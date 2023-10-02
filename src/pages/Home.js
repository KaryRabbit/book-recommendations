import { Box, Button, Typography } from '@mui/joy';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { whiteText } from '../commonStyles';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Typography level="h2" component="h1" sx={whiteText}>
          Discover Your Next Favorite Book!
        </Typography>

        <Typography
          level="title-lg"
          component="p"
          sx={{ marginTop: '1rem', marginBottom: '2rem', ...whiteText }}
        >
          Dive into a world of recommendations tailored just for you. Start your
          reading journey with us today!
        </Typography>

        <Button
          size="lg"
          color="neutral"
          onClick={() => navigate('/search-and-add')}
          variant="soft"
        >
          Get Started
        </Button>
      </Box>
    </>
  );
};

export default Home;
