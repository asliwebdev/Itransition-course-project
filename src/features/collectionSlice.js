import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../utils/axios";
import { toast } from "react-toastify";

const initialState = {
  isCollectionLoading: true,
  isCollectionOpen: false,
  collections: [],
  fields: [],
  name: "",
  topic: "",
  description: "",
  collectionId: "",
  isEditing: false,
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
    setEditCollection: (state, { payload }) => {
      state.isEditing = true;
      state.isCollectionOpen = true;
      const { name, description, topic, collectionId } = payload;
      state.name = name;
      state.description = description;
      state.topic = topic;
      state.collectionId = collectionId;
    },
    toggleEditing: (state) => {
      state.isEditing = !state.isEditing;
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

export const { toggleCollection, setEditCollection, toggleEditing } =
  collectionSlice.actions;

export default collectionSlice.reducer;
