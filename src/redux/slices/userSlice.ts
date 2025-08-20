// src/store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  number: string | null;
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  number: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserState>) => {
      return action.payload; // ✅ replace whole state with user data
    },
    clearUserData: () => {
      return initialState; // ✅ reset
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
