// src/redux/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  username: string;
  email: string;
  password: string;
}

interface AuthState {
  users: User[];
  currentUser: User | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  users: [],  // ✅ must not be missing
  currentUser: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      if (!state.users) {
        state.users = []; // fallback in case rehydration broke it
      }
      state.users.push(action.payload);
    },
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
    },
  },
});

export const { addUser, setCurrentUser, logout } = authSlice.actions;
export default authSlice.reducer;
