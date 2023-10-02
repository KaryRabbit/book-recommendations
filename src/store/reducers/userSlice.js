import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('currentUser') || 'null'),
  users: JSON.parse(localStorage.getItem('users') || 'null'),
  preferences: [],
  myLibrary: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    create: (state, action) => {
      state.currentUser = action.payload.currentUser;
      state.users = action.payload.users;
    },
    update: (state, action) => {
      state.currentUser = action.payload.currentUser;
      state.users = action.payload.users;
    },
    login: (state, action) => {
      state.currentUser = action.payload.currentUser;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
    },
    addToLibrary: (state, action) => {
      const userIndex = state.users.findIndex(
        (user) => user.id === state.currentUser.id
      );

      const addBookToLibrary = (library, book) => {
        if (!library) return [book];
        if (!library.some((existingBook) => existingBook.id === book.id))
          return [...library, book];
        return library;
      };

      if (userIndex !== -1) {
        state.users[userIndex].myLibrary = addBookToLibrary(
          state.users[userIndex].myLibrary,
          action.payload
        );
      }

      state.currentUser.myLibrary = addBookToLibrary(
        state.currentUser.myLibrary,
        action.payload
      );

      state.currentUser.myLibrary = addBookToLibrary(
        state.currentUser.myLibrary,
        action.payload
      );
      saveToLocalStorage('currentUser', state.currentUser);
      updateAndSaveUsers(state.users);
    },

    removeFromLibrary: (state, action) => {
      const userIndex = state.users.findIndex(
        (user) => user.id === state.currentUser.id
      );
      if (userIndex !== -1) {
        state.users[userIndex].myLibrary = state.users[
          userIndex
        ].myLibrary.filter((item) => item.id !== action.payload.id);
      }

      state.currentUser.myLibrary = state.currentUser?.myLibrary.filter(
        (item) => item.id !== action.payload.id
      );
      saveToLocalStorage('currentUser', state.currentUser);
      updateAndSaveUsers(state.users);
    },
  },
});

export const loginUser = (user) => {
  let users = JSON.parse(localStorage.getItem('users') || 'null');
  user = users.find((u) => u.email === user.email);
  localStorage.setItem('currentUser', JSON.stringify(user));

  return userSlice.actions.login({ currentUser: user });
};

export const logoutUser = () => {
  localStorage.removeItem('currentUser');
  return userSlice.actions.logout();
};

export const createUser = (user) => {
  const userId = uuidv4();
  user.id = userId;
  user.myLibrary = [];
  const usersArray = updateUsers(user);
  saveToLocalStorage('currentUser', user);
  return userSlice.actions.create({ currentUser: user, users: usersArray });
};

export const updateUserData = (userData) => {
  let users = JSON.parse(localStorage.getItem('users') ?? 'null');
  let user = users.find((user) => user.id === userData.id);
  if (user) {
    Object.assign(user, userData);

    const usersArray = updateUsers(user);
    saveToLocalStorage('currentUser', user);
    return userSlice.actions.update({ currentUser: user, users: usersArray });
  }
  throw new Error('User not found');
};

const updateUsers = (user) => {
  let users = localStorage.getItem('users');
  let usersArray;
  if (users) {
    usersArray = JSON.parse(users);
    const index = usersArray.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      usersArray[index] = user;
    } else {
      usersArray = [...usersArray, user];
    }
    saveToLocalStorage('users', usersArray);
  } else {
    usersArray = [user];
  }
  saveToLocalStorage('users', usersArray);
  return usersArray;
};

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const updateAndSaveUsers = (usersArray) => {
  saveToLocalStorage('users', usersArray);
  return usersArray;
};

export const {
  login,
  logout,
  create,
  update,
  setCurrentUser,
  removeFromLibrary,
  addToLibrary,
} = userSlice.actions;
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectUsers = (state) => state.user.users;
export const selectCurrentUserPreferences = (state) =>
  state.user.currentUser?.preferences;
export const selectCurrentUserLibrary = (state) => {
  const currentUser = state.user.currentUser;
  if (currentUser) {
    return (
      state.user.users.find((user) => user.email === currentUser.email)
        ?.myLibrary || []
    );
  }
  return [];
};

export default userSlice.reducer;
