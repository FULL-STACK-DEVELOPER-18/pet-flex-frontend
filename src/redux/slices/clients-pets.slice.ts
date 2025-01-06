import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchClientPetList } from '../actions/clients-pets.action';

interface ClientPetState {
  clientPetList: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ClientPetState = {
  clientPetList: [],
  loading: false,
  error: null,
};

export const getClientPetList = createAsyncThunk(
  'clientsPets/fetchClientPetList',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchClientPetList();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const clientSlice = createSlice({
  name: 'clientsPets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClientPetList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClientPetList.fulfilled, (state, action) => {
        state.loading = false;
        state.clientPetList = action.payload;
      })
      .addCase(getClientPetList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default clientSlice.reducer;