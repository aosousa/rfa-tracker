// Core
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'

// Interfaces
import { Bodypart } from '../../interfaces/Bodypart'

// Utils
import { client } from '../../utils/apiClient'

export const fetchBodyparts = createAsyncThunk('bodyparts/fetchBodyparts', async () => {
    const response = await client.get('/bodyparts')
    return response.data.data
})

const bodypartsAdapter = createEntityAdapter({
    sortComparer: (a: Bodypart, b: Bodypart) => b.name.localeCompare(a.name)
})

export const {
    selectById: selectBodypartById
} = bodypartsAdapter.getSelectors((state: any) => state.bodyparts)

const initialState = bodypartsAdapter.getInitialState({
    status: 'idle',
    error: null
})

const bodypartsSlice = createSlice({
    name: 'bodyparts',
    initialState,
    reducers: {},
    extraReducers: (builder: any) => {
        builder.addCase(fetchBodyparts.pending, (state: any) => {
            state.status = 'loading'
        }).addCase(fetchBodyparts.fulfilled, (state: any, action: any) => {
            state.status = 'succeeded'
            bodypartsAdapter.upsertMany(state, action.payload)
        }).addCase(fetchBodyparts.rejected, (state: any, action: any) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    }
});

export default bodypartsSlice.reducer;