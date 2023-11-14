import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import collectionSlice from "./features/collectionSlice";
import itemSlice from "./features/itemSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    collection: collectionSlice,
    item: itemSlice,
  },
});

export default store;
