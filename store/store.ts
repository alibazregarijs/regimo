import { configureStore } from '@reduxjs/toolkit'
import { RegimeSlice } from './RegimeSlice';

export const store = configureStore({
  reducer: {
    regime: RegimeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
