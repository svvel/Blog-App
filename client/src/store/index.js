import {configureStore, createSlice} from '@reduxjs/toolkit'

const authslice = createSlice({
    name: 'auth',
    initialState: { isLoggedIn: false},
    reducers:{
        login(state){
            state.isLoggedIn = true
        },
        logout(state){
            localStorage.removeItem("userId")
            state.isLoggedIn = false
        }
    }
});

export const {login, logout} = authslice.actions

export const store = configureStore({
        reducer: authslice.reducer
})