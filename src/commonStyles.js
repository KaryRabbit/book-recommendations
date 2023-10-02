export const bookmarkIcon = {
  position: 'absolute',
  top: '0.875rem',
  right: '0.5rem',
  height: '30px',
  width: '30px',
  zIndex: '10',
};

export const bookDescription = {
  paddingTop: '1rem',
  marginBottom: '16px',
  overflow: 'auto',

  '&::-webkit-scrollbar': {
    width: '9px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#f0f0f0',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#888',
    borderRadius: '6px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#555',
  },
};

export const whiteText = {
  color: 'white',
};

export const alignCenter = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
};

export const stylesForInput = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#626b74',
    },
    '&:hover fieldset': {
      borderColor: '#626b74',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#626b74',
    },
  },
  '& .MuiOutlinedInput-input': {
    ...whiteText,
  },
  '& .MuiInputLabel-root': {
    ...whiteText,
  },
  '& .MuiInputAdornment-root': {
    '& .MuiSvgIcon-root': {
      ...whiteText,
    },
  },
};
