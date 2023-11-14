import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  collections: [],
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {},
});

export default collectionSlice.reducer;
