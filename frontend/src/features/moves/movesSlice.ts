// Core
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'

// Utils
import { client } from '../../utils/apiClient'

export const fetchMoves = createAsyncThunk('moves/fetchMoves', async () => {
    const response = await client.get('/moves')
    return response.data.data
})

const movesAdapter = createEntityAdapter({})

export const {
    selectAll: selectAllMoves,
    selectById: selectMoveById
} = movesAdapter.getSelectors((state: any) => state.moves)

const initialState = movesAdapter.getInitialState({
    status: 'idle',
    error: null
})

const movesSlice = createSlice({
    name: 'moves',
    initialState,
    reducers: {},
    extraReducers: (builder: any) => {
        builder.addCase(fetchMoves.pending, (state: any) => {
            state.status = 'loading'
        }).addCase(fetchMoves.fulfilled, (state: any, action: any) => {
            state.status = 'succeeded'
            movesAdapter.upsertMany(state, action.payload)
        }).addCase(fetchMoves.rejected, (state: any, action: any) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})

export default movesSlice.reducer;