import { combineReducers } from '@reduxjs/toolkit';
import clientsPetsSlice from './slices/clients-pets.slice';
import blogsSlice from './slices/blogs.slices';
import eventsSlice from './slices/event.slices';
import programReducer from './slices/program-classes-library.slices';
import teammatesReducer from './slices/teammates.slices';
import exerciseReducer from './slices/exercise.slice';

const rootReducer = combineReducers({
  program: programReducer,
  clientsPets: clientsPetsSlice,
  blogs: blogsSlice,
  events: eventsSlice,
  teammates: teammatesReducer,
  exercise: exerciseReducer,
});

export default rootReducer;