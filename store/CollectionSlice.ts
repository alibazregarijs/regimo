import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { CollectionItem } from "@/types/root";

type RegimeState = {
  items: CollectionItem[];
  loading: boolean;
  error: string | null;
};

const initialState: RegimeState = {
  items: [],
  loading: false,
  error: null,
};

// export const FetchRegimeItems = createAsyncThunk(
//   "regime/fetchRegimeItems",
//   async (userId: string, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`/api/ai/regime/${userId}`);
//       return response.data;
//     } catch (error) {
//       if (error instanceof Error) {
//         return rejectWithValue(error.message || "Failed to fetch cart items");
//       }
//     }
//   }
// );

export const AddToCollection = createAsyncThunk(
  "regim/addRegimeItem",
  async ({regimeId,userId}:{regimeId:string,userId:string}, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/ai/collection/${userId}/${regimeId}`, {
        userId,
        regimeId
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to add cart item");
      }
    }
  }
);

export const EditRegimeItem = createAsyncThunk(
  "regim/editRegimeItem",
  async (
    {
      userId,
      regimeId,
      regime,
    }: { userId: string; regimeId: string; regime: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(
        `/api/ai/regime/${userId}/${regimeId}`,
        {
          regime,
        }
      );
      console.log(response.data, "data in regime slice");
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to add cart item");
      }
    }
  }
);

export const RegimeSlice = createSlice({
  name: "regime",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle pending state
      
  },
});

export default RegimeSlice.reducer;
