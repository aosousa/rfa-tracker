// Core
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Utils
import { client } from '../../utils/apiClient'

export const login = createAsyncThunk('auth/login', async (requestBody: any) => {
  const response = await client.post('/auth/login', requestBody)

  return response.data.data
})

const initialState = {
  status: 'idle',
  data: '',
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.data = action.payload
    },
    logout: (state) => {
      state.data = ''
      document.cookie = "rfa-t_session=''; Max-Age=0;"
    }
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(login.pending, (state: any) => {
        state.status = 'loading'
      })
      .addCase(login.fulfilled, (state: any, action: any) => {
        state.status = 'succeeded'
        state.data = action.payload
        document.cookie = `rfa-t_session=${action.payload}; Max-Age=${60 * 60 * 31 * 24}; SameSite=None; Secure`
      })
      .addCase(login.rejected, (state: any, action: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { setAuthData, logout } = authSlice.actions

export default authSlice.reducer
