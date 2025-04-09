import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RegimItem } from "@/types/root";

type NotificationProps = {
  name: string;
  time: string;
  foods: string[];
  protein: string;
  carbs: string;
  fat: string;
};

type NotificationState = {
  items: NotificationProps[];
  loading: boolean;
  error: string | null;
};

const initialState: NotificationState = {
  items: [],
  loading: false,
  error: null,
};

export const RegimeSlice = createSlice({
  name: "regime",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export default RegimeSlice.reducer;
