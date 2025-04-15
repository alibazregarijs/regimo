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

export const FetchCollectionItems = createAsyncThunk(
  "collection/fetchCollectionItems",
  async () => {
    try {
      const response = await axios.get(`/api/ai/collection`);
      return response.data.data;
    } catch (error) {
      console.log(error, "error in fetching collection items");
    }
  }
);

export const AddToCollection = createAsyncThunk(
  "regim/addCollectionItem",
  async (
    { regimeId, userId }: { regimeId: string; userId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `/api/ai/collection/${userId}/${regimeId}`,
        {
          userId,
          regimeId,
        }
      );
      console.log(response.data,"in data.response")
      return response.data.collection;
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

export const CollectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchCollectionItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        FetchCollectionItems.fulfilled,
        (state, action: PayloadAction<CollectionItem[]>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )

      .addCase(FetchCollectionItems.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to add regime item";
      })

      // Add to Collection
      .addCase(AddToCollection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        AddToCollection.fulfilled,
        (state, action: PayloadAction<CollectionItem>) => {
          state.loading = false;
          console.log(action.payload,"in extra builder")
          state.items.unshift(action.payload); // add new item to items
        }
      )
      .addCase(AddToCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to add regime item";
      });
  },
});

export default CollectionSlice.reducer;
