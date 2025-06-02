import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fileBarSlice } from './features/filesBarSlice';
import { contextMenuSlice } from './features/contextMenuSlice';
import { fileTreeSlice } from './features/fileTreeSlice';
import { editorSlice } from './features/editorSlice';
import { outlineSlice } from './features/outlineSlice';
import outlineVisibilitySlice from './features/outlineVisibilitySlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import { configureStore, Middleware } from '@reduxjs/toolkit';
import { actionInterceptor } from './middleware/actionInterceptor';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

// Define RootState type before using it in store configuration
// This matches the shape of our reducer object
export interface RootState {
  fileBarSlice: ReturnType<typeof fileBarSlice.reducer>;
  contextMenuSlice: ReturnType<typeof contextMenuSlice.reducer>;
  fileTreeSlice: ReturnType<typeof fileTreeSlice.reducer>;
  editor: ReturnType<typeof editorSlice.reducer>;
  outline: ReturnType<typeof outlineSlice.reducer>;
  outlineVisibility: ReturnType<typeof outlineVisibilitySlice.reducer>;
}

// Configure persistence
const persistConfig = {
  key: 'root',
  storage,
  // Optionally blacklist some state items you don't want to persist
  // blacklist: ['contextMenuSlice'],
};

// Combine all reducers
const rootReducer = combineReducers({
  fileBarSlice: fileBarSlice.reducer,
  contextMenuSlice: contextMenuSlice.reducer,
  fileTreeSlice: fileTreeSlice.reducer,
  editor: editorSlice.reducer,
  outline: outlineSlice.reducer,
  outlineVisibility: outlineVisibilitySlice,
});

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with properly typed middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      // This is needed because redux-persist uses non-serializable values
      serializableCheck: {
        // ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'fileTree/setReplaceTree']
      }
    }).concat(actionInterceptor as Middleware<unknown, RootState>),
});

// Create persistor
export const persistor = persistStore(store);

// These types use the store object but don't create circular references
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>;
