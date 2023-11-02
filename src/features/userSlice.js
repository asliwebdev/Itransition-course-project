import { createSlice } from "@reduxjs/toolkit";
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from "../utils/localStorage";


const initialState = {
    isSidebarOpen: false,
    user: getUserFromLocalStorage()?.user,
}

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
         }
    }
})

export const {toggleSidebar, loginUser, logoutUser} = userSlice.actions

export default userSlice.reducer