import { configureStore, } from '@reduxjs/toolkit';

import bodypartsReducer from '../features/bodyparts/bodypartsSlice';
import movesReducer from '../features/moves/movesSlice';

export const store = configureStore({
  reducer: { 
    bodyparts: bodypartsReducer,
    moves: movesReducer
  },
});