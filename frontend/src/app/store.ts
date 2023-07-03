import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../features/auth/authSlice'
import bodypartsReducer from '../features/bodyparts/bodypartsSlice'
import movesReducer from '../features/moves/movesSlice'
import moveCategoriesReducer from '../features/moveCategories/moveCategoriesSlice'
import workoutsReducer from '../features/workouts/workoutsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bodyparts: bodypartsReducer,
    moves: movesReducer,
    moveCategories: moveCategoriesReducer,
    workouts: workoutsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
