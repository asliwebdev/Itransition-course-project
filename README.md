// export const createCollection = createAsyncThunk(
// "collection/createCollection",
// async (\_, thunkAPI) => {
// try {
// const { user } = thunkAPI.getState().user;
// const { name, topic, description } = thunkAPI.getState().collection;
// const collection = { name, topic, description };
// const response = await customFetch.post("/collections", {
// user,
// collection,
// });
// return response.data;
// } catch (error) {
// return thunkAPI.rejectWithValue(error.response.data.message);
// }
// }
// );

// .addCase(createCollection.pending, (state) => {
// state.isLoading = true;
// })
// .addCase(createCollection.fulfilled, (state, { payload }) => {
// state.isLoading = false;
// const { name, topic, description } = payload.collection;
// state.name = name;
// state.topic = topic;
// state.description = description;
// })
// .addCase(createCollection.rejected, (state, { payload }) => {
// state.isLoading = false;
// toast.error(payload);
// });
