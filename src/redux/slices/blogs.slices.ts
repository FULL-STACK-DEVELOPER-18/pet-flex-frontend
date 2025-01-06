import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createBlogApi, deleteBlogApi, fetchBlogList, updateBlogApi } from '../actions/blogs.action';
import { BlogFormData } from '../../pages/community-blog';

interface BlogState {
  blogList: any[];
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  blogList: [],
  loading: false,
  error: null,
};

export const getBlogList = createAsyncThunk(
  'blogs/fetchBlogList',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchBlogList();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createBlog = createAsyncThunk(
  'blogs/createBlog',
  async (blogData: FormData, { rejectWithValue }) => {
    try {
      const data = await createBlogApi(blogData);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateBlog = createAsyncThunk(
  'blogs/updateBlog',
  async ({ id, blogData }: { id: string; blogData: BlogFormData }, { rejectWithValue }) => {
    try {
      const data = await updateBlogApi(id, blogData);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteBlogApi(id);
      return id;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlogList.fulfilled, (state, action) => {
        state.loading = false;
        state.blogList = action.payload;
      })
      .addCase(getBlogList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogList = state.blogList.filter(blog => blog._id !== action.payload);
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        console.log("action.payload", action.payload);
        state.blogList.push(action.payload);
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        console.log("action.payload", action.payload);
        state.blogList = state.blogList.map(blog => blog._id === action.payload._id ? action.payload : blog);
      });
  },
});

export default blogSlice.reducer;