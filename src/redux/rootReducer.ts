import { combineReducers } from '@reduxjs/toolkit';
import clientsPetsSlice from './slices/clients-pets.slice';
import blogsSlice from './slices/blogs.slices';
import eventsSlice from './slices/event.slices';
const rootReducer = combineReducers({
  clientsPets: clientsPetsSlice,
  blogs: blogsSlice,
  events: eventsSlice,
});

export default rootReducer;