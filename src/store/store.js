import { configureStore } from '@reduxjs/toolkit';
import loaderReducer from './reducers/loaderSlice';
import snackbarReducer from './reducers/snackbarSlice';
import userReducer from './reducers/userSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    loader: loaderReducer,
    snackbar: snackbarReducer,
  },
});
