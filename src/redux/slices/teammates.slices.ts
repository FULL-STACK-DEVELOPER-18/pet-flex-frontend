import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TeammateData } from '../../interfaces/teammate.interface';
import { createTeammate, deleteTeammate, fetchTeammateList, updateTeammate } from '../actions/teammates.action';

interface TeammateState {
  teammateList: TeammateData[];
  loading: boolean;
  error: string | null;
}

const initialState: TeammateState = {
  teammateList: [],
  loading: false,
  error: null,
};

export const getTeammateList = createAsyncThunk(
  'teammates/fetchList',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchTeammateList();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const addTeammate = createAsyncThunk(
  'teammates/add',
  async (teammateData: TeammateData, { rejectWithValue }) => {
    try {
      const data = await createTeammate(teammateData);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const editTeammate = createAsyncThunk(
  'teammates/edit',
  async ({ id, teammateData }: { id: string; teammateData: TeammateData }, { rejectWithValue }) => {
    try {
      const data = await updateTeammate(id, teammateData);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const removeTeammate = createAsyncThunk(
  'teammates/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteTeammate(id);
      return id;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const teammateSlice = createSlice({
  name: 'teammates',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeammateList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeammateList.fulfilled, (state, action) => {
        state.loading = false;
        state.teammateList = action.payload;
      })
      .addCase(getTeammateList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addTeammate.fulfilled, (state, action) => {
        state.teammateList.push(action.payload);
      })
      .addCase(editTeammate.fulfilled, (state, action) => {
        const index = state.teammateList.findIndex(teammate => teammate._id === action.payload._id);
        if (index !== -1) {
          state.teammateList[index] = action.payload;
        }
      })
      .addCase(removeTeammate.fulfilled, (state, action) => {
        state.teammateList = state.teammateList.filter(teammate => teammate._id !== action.payload);
      });
  },
});

export default teammateSlice.reducer;