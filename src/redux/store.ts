import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'
// import storage from 'redux-persist/lib/storage'

import booksReducer from './slices/booksSlice'
import userReducer from './slices/userSlice'
import authorsReducer from './slices/authorsSlice'

const persistConfig = {
  key: 'root',
  storage: storageSession,
  // blacklist: ['books', 'authors']
}

const rootReducer = combineReducers({
  books: booksReducer,
  user: userReducer,
  authors: authorsReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
