import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSidebarOpen: false,
    user: {},
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen
        }
    }
})

export const {toggleSidebar} = userSlice.actions

export default userSlice.reducer