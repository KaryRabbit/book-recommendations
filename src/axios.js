import axios from 'axios';
import { hideLoader, showLoader } from './store/reducers/loaderSlice';
import { showSnackbar } from './store/reducers/snackbarSlice';
import { store } from './store/store';

const instance = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1/',
  timeout: 5000,
  params: {
    key: process.env.REACT_APP_API_KEY,
  },
});

instance.interceptors.request.use(
  (config) => {
    store.dispatch(showLoader());

    return config;
  },
  (error) => {
    store.dispatch(hideLoader());

    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    store.dispatch(hideLoader());
    return response;
  },
  (error) => {
    store.dispatch(hideLoader());
    store.dispatch(
      showSnackbar({
        message: error.message,
        severity: 'warning',
      })
    );
    return null;
  }
);

export default instance;
