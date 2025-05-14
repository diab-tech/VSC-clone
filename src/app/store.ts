import { configureStore, Middleware } from '@reduxjs/toolkit';
import { fileBarSlice } from './features/filesBarSlice';
import { contextMenuSlice } from './features/contextMenuSlice';
import { actionInterceptor } from './middleware/actionInterceptor';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { fileTreeSlice } from './features/fileTreeSlice';

// Import redux-persist
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from '@reduxjs/toolkit';

// Define RootState type before using it in store configuration
// This matches the shape of our reducer object
export interface RootState {
  fileBarSlice: ReturnType<typeof fileBarSlice.reducer>;
  contextMenuSlice: ReturnType<typeof contextMenuSlice.reducer>;
  fileTreeSlice: ReturnType<typeof fileTreeSlice.reducer>;
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
  fileTreeSlice: fileTreeSlice.reducer
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
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    }).concat(actionInterceptor as Middleware<unknown, RootState>),
});

// Create persistor
export const persistor = persistStore(store);

// These types use the store object but don't create circular references
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>;
