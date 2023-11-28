import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../utils/axios";

const initialState = {
  isItemLoading: true,
  name: "",
  tags: [],
  customFields: [],
  customValues: [],
  items: [],
  itemId: "",
};

export const getItems = createAsyncThunk(
  "item/getItems",
  async (_, thunkAPI) => {
    const { collectionId } = thunkAPI.getState().collection;
    try {
      const currentUrl = window.location.href;

      const urlParts = currentUrl.split("/");
      const id = urlParts[urlParts.length - 1];

      const response = await customFetch.get(
        `/collections/${collectionId || id}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const createItem = createAsyncThunk(
  "item, createItem",
  async (_, thunkAPI) => {
    const { collectionId } = thunkAPI.getState().collection;
    const { name, tags, customValues } = thunkAPI.getState().item;
    try {
      const currentUrl = window.location.href;

      const urlParts = currentUrl.split("/");
      const id = urlParts[urlParts.length - 3];

      const response = await customFetch.post(
        `/collections/${collectionId || id}/items`,
        { item: { name, tags, customFields: customValues, collectionId } }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getItem = createAsyncThunk(
  "item, getItem",
  async (_, thunkAPI) => {
    const { collectionId } = thunkAPI.getState().collection;
    const { itemId } = thunkAPI.getState().item;
    try {
      const currentUrl = window.location.href;

      const urlParts = currentUrl.split("/");
      const id = urlParts[urlParts.length - 3];

      const response = await customFetch.get(
        `/collections/${collectionId || id}/items/${itemId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      if (name === "name") {
        state[name] = value;
      } else {
        const existingCustomValueIndex = state.customValues.findIndex(
          (cv) => cv.name === name
        );

        if (existingCustomValueIndex !== -1) {
          state.customValues[existingCustomValueIndex].value = value;
        } else {
          state.customValues = [...state.customValues, { name, value }];
        }
      }
    },
    addTag: (state, { payload }) => {
      state.tags = [...state.tags, payload];
    },
    removeTag: (state, { payload }) => {
      let newTags = state.tags.filter((tag) => tag !== payload);
      state.tags = newTags;
    },
    setItemId: (state, { payload }) => {
      state.itemId = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.isItemLoading = true;
      })
      .addCase(getItems.fulfilled, (state, { payload }) => {
        state.isItemLoading = false;
        state.items = payload.collection.items;
        state.customFields = payload.collection.customFields;
      })
      .addCase(getItems.rejected, (state, { payload }) => {
        state.isItemLoading = false;
        toast.error(payload.message);
      })
      .addCase(createItem.pending, (state) => {
        state.isItemLoading = true;
      })
      .addCase(createItem.fulfilled, (state, { payload }) => {
        state.isItemLoading = false;
        toast.success(payload.message);
      })
      .addCase(createItem.rejected, (state, { payload }) => {
        state.isItemLoading = false;
        toast.error(payload.message);
      })
      .addCase(getItem.pending, (state) => {
        state.isItemLoading = true;
      })
      .addCase(getItem.fulfilled, (state, { payload }) => {
        state.isItemLoading = false;
        state.name = payload.item.name;
        state.tags = payload.item.tags.map((tag) => tag.name);
        state.customValues = payload.item.customFields;
      })
      .addCase(getItem.rejected, (state, { payload }) => {
        state.isItemLoading = false;
        toast.error(payload.message);
      });
  },
});

export const { handleChange, addTag, removeTag, setItemId } = itemSlice.actions;

export default itemSlice.reducer;
