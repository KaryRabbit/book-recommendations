import { Box, Typography } from '@mui/joy';
import React from 'react';
import { alignCenter, whiteText } from '../commonStyles';

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        ...alignCenter,
        flexDirection: 'column',
        backgroundColor: 'background.default',
      }}
    >
      <Typography level="h1" sx={whiteText}>
        404
      </Typography>
      <Typography level="h4" sx={whiteText}>
        Page Not Found
      </Typography>
    </Box>
  );
};

export default NotFoundPage;
