import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProgramList, createProgram, updateProgram, ProgramData } from '../actions/program-classes-library.action';

interface ProgramState {
  programList: ProgramData[];
  loading: boolean;
  error: string | null;
}

const initialState: ProgramState = {
  programList: [],
  loading: false,
  error: null,
};

export const fetchProgramList = createAsyncThunk(
  'program/fetchList',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getProgramList();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const addProgram = createAsyncThunk(
  'program/add',
  async (programData: ProgramData, { rejectWithValue }) => {
    try {
      const data = await createProgram(programData);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const editProgram = createAsyncThunk(
  'program/edit',
  async ({ id, programData }: { id: string; programData: ProgramData }, { rejectWithValue }) => {
    try {
      const data = await updateProgram(id, programData);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const programSlice = createSlice({
  name: 'program',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgramList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProgramList.fulfilled, (state, action) => {
        state.loading = false;
        state.programList = action.payload;
      })
      .addCase(fetchProgramList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addProgram.fulfilled, (state, action) => {
        state.programList.push(action.payload);
      })
      .addCase(editProgram.fulfilled, (state, action) => {
        const index = state.programList.findIndex(program => program._id === action.payload._id);
        if (index !== -1) {
          state.programList[index] = action.payload;
        }
      });
  },
});

export default programSlice.reducer;