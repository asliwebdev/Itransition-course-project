import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  item: {
    name: "",
    tags: [],
  },
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {},
});

export default itemSlice.reducer;
