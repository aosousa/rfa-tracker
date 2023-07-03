// Core
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'

// Utils
import { client } from '../../utils/apiClient'

export const fetchMoveCategories = createAsyncThunk('moveCategories/fetchMoveCategories', async () => {
  const response = await client.get('/move_categories')
  return response.data.data
})

const moveCategoriesAdapter = createEntityAdapter({})

export const { selectAll: selectAllMoveCategories, selectById: selectMoveCategoryById } = moveCategoriesAdapter.getSelectors((state: any) => state.moveCategories)

const initialState = moveCategoriesAdapter.getInitialState({
  status: 'idle',
  error: null
})

const moveCategoriesSlice = createSlice({
  name: 'moveCategories',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchMoveCategories.pending, (state: any) => {
        state.status = 'loading'
      })
      .addCase(fetchMoveCategories.fulfilled, (state: any, action: any) => {
        state.status = 'succeeded'
        moveCategoriesAdapter.upsertMany(state, action.payload)
      })
      .addCase(fetchMoveCategories.rejected, (state: any, action: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default moveCategoriesSlice.reducer
