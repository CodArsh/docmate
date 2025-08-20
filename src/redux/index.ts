// src/store/index.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './slices/userSlice';
import tokenReducer from './slices/tokenSlice';
import logoutReducer from './slices/logoutSlice'
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'token', 'logout'], // only persist these reducers
};

const rootReducer = combineReducers({
  user: userReducer,
  token: tokenReducer,
  logout: logoutReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed for redux-persist
    }),
});

export const persistor = persistStore(store);

// ✅ Types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
