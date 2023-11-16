import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../utils/axios";
import { toast } from "react-toastify";

const initialState = {
  isCollectionLoading: true,
  isCollectionOpen: false,
  collections: [],
  name: "",
  topic: "",
  description: "",
};

export const getAllCollections = createAsyncThunk(
  "collection/getAllCollections",
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get("/collections");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    toggleCollection: (state) => {
      state.isCollectionOpen = !state.isCollectionOpen;
    },
    createCollection: (state, { payload }) => {
      const { name, topic, description } = payload.collection;
      state.name = name;
      state.topic = topic;
      state.description = description;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCollections.pending, (state) => {
        state.isCollectionLoading = true;
      })
      .addCase(getAllCollections.fulfilled, (state, { payload }) => {
        state.isCollectionLoading = false;
        state.collections = payload.collections;
      })
      .addCase(getAllCollections.rejected, (state, { payload }) => {
        state.isCollectionLoading = false;
        toast.error(payload);
      });
  },
});

export const { toggleCollection, createCollection } = collectionSlice.actions;

export default collectionSlice.reducer;
