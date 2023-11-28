import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../utils/axios";
import { toast } from "react-toastify";
import {
  addCollectionIdToLocalStorage,
  getCollectionIdFromLocalStorage,
} from "../utils/localStorage";

const initialState = {
  isCollectionLoading: true,
  isCollectionOpen: false,
  collections: [],
  fields: [],
  name: "",
  topic: "",
  description: "",
  collectionId: getCollectionIdFromLocalStorage() || "",
  isEditing: false,
  isConfirmOpen: false,
  isAddFieldOpen: false,
  isFieldSelected: false,
  isFieldsChanged: false,
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

export const getCollection = createAsyncThunk(
  "collection/getCollection",
  async (_, thunkAPI) => {
    const { collectionId } = thunkAPI.getState().collection;
    try {
      const currentUrl = window.location.href;

      const urlParts = currentUrl.split("/");
      const id = urlParts[urlParts.length - 2];

      const response = await customFetch.get(
        `/collections/${collectionId || id}/fields`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateCollection = createAsyncThunk(
  "collection, updateCollection",
  async (_, thunkAPI) => {
    try {
      const { fields, collectionId } = thunkAPI.getState().collection;
      const currentUrl = window.location.href;

      const urlParts = currentUrl.split("/");
      const id = urlParts[urlParts.length - 2];

      const response = await customFetch.patch(
        `/collections/${collectionId || id}`,
        {
          updatedFields: { customFields: fields },
        }
      );
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
      state.isFieldsChanged = true;
    },
    editField: (state, { payload }) => {
      let newFields = state.fields.filter((field) => field.id !== payload.id);
      state.fields = [...newFields, payload];
      state.isAddFieldOpen = false;
      state.isFieldSelected = false;
      state.isFieldsChanged = true;
    },
    deleteField: (state, { payload }) => {
      let newFields = state.fields.filter((field) => field.id !== payload.id);
      state.fields = newFields;
      state.isFieldsChanged = true;
    },
    setCollectionId: (state, { payload }) => {
      state.collectionId = payload.id;
      addCollectionIdToLocalStorage(payload.id);
    },
    toggleFieldsChanged: (state) => {
      state.isFieldsChanged = !state.isFieldsChanged;
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
      })
      .addCase(getCollection.pending, (state) => {
        state.isCollectionLoading = true;
      })
      .addCase(getCollection.fulfilled, (state, { payload }) => {
        state.isCollectionLoading = false;
        state.fields = payload.collection.customFields;
      })
      .addCase(getCollection.rejected, (state, { payload }) => {
        state.isCollectionLoading = false;
        toast.error(payload.message);
      })
      .addCase(updateCollection.pending, (state) => {
        state.isCollectionLoading = true;
      })
      .addCase(updateCollection.fulfilled, (state, { payload }) => {
        state.isCollectionLoading = false;
        state.isFieldsChanged = false;
        state.fields = payload.collection.customFields;
        toast.success("Field changes saved successfully");
      })
      .addCase(updateCollection.rejected, (state, { payload }) => {
        state.isCollectionLoading = false;
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
  deleteField,
  setCollectionId,
  toggleFieldsChanged,
} = collectionSlice.actions;

export default collectionSlice.reducer;
