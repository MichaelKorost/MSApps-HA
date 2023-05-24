import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "./photoService";

const initialState = {
  photos: [],
  totalPages: 0,
  currentPage: 0,
  isError: false,
  isSuccess: false,
  isLoading: true,
  message: "",
};

// get photos
// receives an object of category and page from HomePage.jsx and passes them to photoService.js
export const getPhotos = createAsyncThunk(
  "photo/getPhotos",
  async ({ category, page }, thunkAPI) => {
    try {
      return await photoService.getPhotos(category, page);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get photos by order
// receives an object of category, page, and order from HomePage.jsx and passes them to photoService.js
export const getPhotosByOrder = createAsyncThunk(
  "photo/getPhotosByOrder",
  async ({ category, page, order }, thunkAPI) => {
    try {
      return await photoService.getPhotosByOrder(category, page, order);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPhotos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPhotos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.photos = action.payload.photos;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getPhotos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getPhotosByOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPhotosByOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.photos = action.payload.photos;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getPhotosByOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = photoSlice.actions;
export default photoSlice.reducer;
