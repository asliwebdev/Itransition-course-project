import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from "../utils/localStorage";
import customFetch from '../utils/axios'
import { toast } from "react-toastify";

const initialState = {
    isSidebarOpen: false,
    isLoading: false,
    user: getUserFromLocalStorage()?.user,
    users: [],
    selectedUsers: [],
}

export const getAllUsers = createAsyncThunk('user/getAllUsers', 
  async (_, thunkAPI) => {
    try {
        const response = await customFetch.get('/users');
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
)


export const handleActions = createAsyncThunk('user/handleActions', 
  async (actionType, thunkAPI) => {
    try {
        const { selectedUsers, user } = thunkAPI.getState().user;
        const {_id: id} = user;
        if(selectedUsers.length === 0) {
            toast.warn('There is no selected user')
            return;
        }
        const response = await customFetch.patch('/users/action', {selectedUsers, actionType});
        if (id && selectedUsers.includes(id) && (actionType === 'delete' || actionType === 'block')) {
           thunkAPI.dispatch(logoutUser());
        }
        if(id && selectedUsers.includes(id) && (actionType === 'removeAdmin')) {
            let updatedUser = {...user, role: 'user'};
            thunkAPI.dispatch(loginUser({user: updatedUser}));
        }
        thunkAPI.dispatch(clearSelectedUsers());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen
        },
        loginUser: (state, {payload}) => {
            state.user = payload.user;
            addUserToLocalStorage(payload);
        },
        logoutUser: (state) => {
            state.user = null;
            state.isSidebarOpen = false;
            removeUserFromLocalStorage();
         },
        handleUserSelection : (state, {payload}) => {
            const {selectedUsers} = state;
            const {id} = payload;
            let newSelectedUsers;
            if(selectedUsers.includes(id)) {
              newSelectedUsers = selectedUsers.filter(userId => userId !== id)
            } else {
              newSelectedUsers = [...selectedUsers, id];
            }
            state.selectedUsers = newSelectedUsers;
        },
        clearSelectedUsers: (state) => {
            state.selectedUsers = [];
        },
        selectAllUsers: (state) => {
            const {users, selectedUsers} = state;
            let newSelectedUsers;
            if(selectedUsers.length === 0) {
              newSelectedUsers = users.map(user => user._id);
            } else {
              newSelectedUsers = [];
            }
            state.selectedUsers = newSelectedUsers;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(handleActions.pending, (state, {payload}) => {
            if(!payload) {
              state.isLoading = false;
            } else {
              state.isLoading = true;
            }
        }).addCase(handleActions.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.users = payload?.users;
            toast.success(payload?.message);
        }).addCase(handleActions.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload);
        }).addCase(getAllUsers.pending, (state) => {
            state.isLoading = true
        }).addCase(getAllUsers.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.users = payload.users;
        }).addCase(getAllUsers.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload)
        })
    }
})

export const {toggleSidebar, loginUser, logoutUser, handleUserSelection, clearSelectedUsers, selectAllUsers} = userSlice.actions

export default userSlice.reducer