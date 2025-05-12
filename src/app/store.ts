import { configureStore, Middleware } from '@reduxjs/toolkit';
import { fileTreeSlice } from './features/fileTreeSlice';
import { contextMenuSlice } from './features/contextMenuSlice';
import { actionInterceptor } from './middleware/actionInterceptor';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

// Define RootState type before using it in store configuration
// This matches the shape of our reducer object
export interface RootState {
  fileTreeSlice: ReturnType<typeof fileTreeSlice.reducer>;
  contextMenuSlice: ReturnType<typeof contextMenuSlice.reducer>;
}

// Create the store with properly typed middleware
export const store = configureStore({
  reducer: { 
    fileTreeSlice: fileTreeSlice.reducer, 
    contextMenuSlice: contextMenuSlice.reducer 
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(actionInterceptor as Middleware<unknown, RootState>),
});

// These types use the store object but don't create circular references
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>;
