import { createSlice} from "@reduxjs/toolkit";

const intialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    intialState,
    reducers: {
        login: (state,action) => {
            state.status = true
            state.userData = action.payload.userData
        },

        logOut: (state) => {
            state.status = false
            state.userData = null
        }
    }
});

export const {login, logOut} = authSlice.actions

export default authSlice.reducer;