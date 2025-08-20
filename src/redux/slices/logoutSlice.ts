import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'logout',
  initialState: {
    logoutModalVisible: false,
  },
  reducers: {
    showLogoutModal: (state) => {
      state.logoutModalVisible = true;
    },
    hideLogoutModal: (state) => {
      state.logoutModalVisible = false;
    },
  },
});

export const { showLogoutModal, hideLogoutModal } = appSlice.actions;
export default appSlice.reducer;
