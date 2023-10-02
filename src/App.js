import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import MyLibraryPage from './pages/MyLibrary';
import NotFoundPage from './pages/NotFound';
import ProfilePage from './pages/Profile';
import RecommendationsPage from './pages/Recommendations';
import RootLayout from './pages/Root';
import SearchAndAddPage from './pages/SearchAndAdd';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/book-recommendations">
        <RootLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="my-library" element={<MyLibraryPage />} />
            <Route path="search-and-add" element={<SearchAndAddPage />} />
            <Route path="recommendations" element={<RecommendationsPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </RootLayout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
