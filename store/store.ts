import { configureStore } from '@reduxjs/toolkit'
import { RegimeSlice  } from './RegimeSlice';
import { CollectionSlice } from './CollectionSlice';

export const store = configureStore({
  reducer: {
    regime: RegimeSlice.reducer,
    collection: CollectionSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
