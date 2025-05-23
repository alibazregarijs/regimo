import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RegimItem } from "@/types/root";

type RegimeState = {
  items: RegimItem[];
  loading: boolean;
  error: string | null;
};

const initialState: RegimeState = {
  items: [],
  loading: false,
  error: null,
};

export const FetchRegimeItems = createAsyncThunk(
  "regime/fetchRegimeItems",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/ai/regime/${userId}`);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to fetch cart items");
      }
    }
  }
);

export const AddRegimeItem = createAsyncThunk(
  "regim/addRegimeItem",
  async (props: RegimItem, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/ai/regime/${props.userId}`, {
        gender: props.gender,
        type: props.type,
        weight: props.weight,
        height: props.height,
        age: props.age,
        activity_level: props.activity_level,
        waist_circumference: props.waist_circumference,
        bicep_circumference: props.bicep_circumference,
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
      .addCase(AddRegimeItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handle fulfilled state
      .addCase(
        AddRegimeItem.fulfilled,
        (state, action: PayloadAction<RegimItem>) => {
          state.loading = false;
          state.items.unshift(action.payload);
        }
      )
      // Handle rejected state
      .addCase(AddRegimeItem.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to add regime item";
      })

      // Fetch regime items

      .addCase(FetchRegimeItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        FetchRegimeItems.fulfilled,
        (state, action: PayloadAction<RegimItem[]>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )

      .addCase(FetchRegimeItems.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to add regime item";
      })

      .addCase(EditRegimeItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        EditRegimeItem.fulfilled,
        (
          state,
          action: PayloadAction<{
            regime: string;
            userId: string;
            regimeId: string;
          }>
        ) => {
          state.loading = false;
          // Find and update the specific regime item
          const index = state.items.findIndex(
            (item) => item.id === action.payload.regimeId
          );
          if (index !== -1) {
            state.items[index] = {
              ...state.items[index],
              regime: action.payload.regime,
            };
          }
        }
      )
      .addCase(EditRegimeItem.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to edit regime item";
      });
  },
});

export default RegimeSlice.reducer;
