import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ExerciseData } from '../../interfaces/exercise.interface';
import { addExerciseApi, deleteExerciseApi, fetchExerciseList, updateExerciseApi } from '../actions/exercise.action';

interface ExerciseState {
  exerciseList: ExerciseData[];
  loading: boolean;
  error: string | null;
}

const initialState: ExerciseState = {
  exerciseList: [],
  loading: false,
  error: null,
};

export const getExerciseList = createAsyncThunk(
  'exercise/fetchList',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchExerciseList();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const addExercise = createAsyncThunk(
  'exercise/add',
  async (data: FormData, { rejectWithValue }) => {
    try {
      const response = await addExerciseApi(data);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateExercise = createAsyncThunk(
  'exercise/update',
  async ({ id, data }: { id: string; data: FormData }, { rejectWithValue }) => {
    try {
      const response = await updateExerciseApi(id, data);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteExercise = createAsyncThunk(
  'exercise/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteExerciseApi(id);
      return id;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getExerciseList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExerciseList.fulfilled, (state, action) => {
        state.loading = false;
        state.exerciseList = action.payload;
      })
      .addCase(getExerciseList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addExercise.fulfilled, (state, action) => {
        state.exerciseList.push(action.payload);
      })
      .addCase(updateExercise.fulfilled, (state, action) => {
        const index = state.exerciseList.findIndex(exercise => exercise._id === action.payload._id);
        if (index !== -1) {
          state.exerciseList[index] = action.payload;
        }
      })
      .addCase(deleteExercise.fulfilled, (state, action) => {
        state.exerciseList = state.exerciseList.filter(exercise => exercise._id !== action.payload);
      });
  },
});

export default exerciseSlice.reducer; 