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
  isConfirmOpen: false,
  isAddFieldOpen: false,
  isFieldSelected: false,
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

export const deleteCollection = createAsyncThunk(
  "collection/deleteCollection",
  async (collectionId, thunkAPI) => {
    try {
      const response = await customFetch.delete(`/collections/${collectionId}`);
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
      const { name, description, topic, collectionId } = payload;
      state.name = name;
      state.description = description;
      state.topic = topic;
      state.collectionId = collectionId;
    },
    toggleEditing: (state) => {
      state.isEditing = !state.isEditing;
    },
    toggleConfirm: (state, { payload }) => {
      if (payload) {
        const { name, collectionId } = payload;
        state.name = name;
        state.collectionId = collectionId;
      }
      state.isConfirmOpen = !state.isConfirmOpen;
    },
    toggleAddField: (state) => {
      state.isAddFieldOpen = !state.isAddFieldOpen;
    },
    toggleFieldSelected: (state) => {
      state.isFieldSelected = !state.isFieldSelected;
    },
    addField: (state, { payload }) => {
      state.fields = [...state.fields, payload];
      state.isAddFieldOpen = false;
      state.isFieldSelected = false;
    },
    editField: (state, { payload }) => {
      let newFields = state.fields.filter((field) => field.id !== payload.id);
      state.fields = [...newFields, payload];
      state.isAddFieldOpen = false;
      state.isFieldSelected = false;
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
        toast.error(payload.message);
      })
      .addCase(deleteCollection.fulfilled, (state, { payload }) => {
        state.isConfirmOpen = false;
        toast.success(payload.message);
      })
      .addCase(deleteCollection.rejected, (state, { payload }) => {
        state.isConfirmOpen = false;
        toast.error(payload.message);
      });
  },
});

export const {
  toggleCollection,
  setEditCollection,
  toggleEditing,
  toggleConfirm,
  toggleAddField,
  toggleFieldSelected,
  addField,
  editField,
} = collectionSlice.actions;

export default collectionSlice.reducer;
