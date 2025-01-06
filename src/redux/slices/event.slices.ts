import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEvents } from '../actions/event.action';

interface BlogState {
  eventList: any[];
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  eventList: [],
  loading: false,
  error: null,
};

export const getEventList = createAsyncThunk(
  'events/fetchEventList',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchEvents();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const blogSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEventList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEventList.fulfilled, (state, action) => {
        state.loading = false;
        state.eventList = action.payload;
      })
      .addCase(getEventList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export default blogSlice.reducer