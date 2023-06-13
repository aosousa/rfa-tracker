// Core
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Utils
import { client } from "../../utils/apiClient"

export const login = createAsyncThunk('auth/login', 
    async (requestBody: any) => {
        const response = await client.post('/auth/login', requestBody)

        return response.data.data
    }
)

const initialState = {
    status: 'idle',
    data: false,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: { },
    extraReducers: (builder: any) => {
        builder.addCase(login.pending, (state: any, action: any) => {
            state.status = 'loading'
        })
        .addCase(login.fulfilled, (state: any, action: any) => {
            console.log(action)
            state.status = 'succeeded'
            state.data = true
            // TODO: set auth cookie
        })
        .addCase(login.rejected, (state: any, action: any) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})

export default authSlice.reducer