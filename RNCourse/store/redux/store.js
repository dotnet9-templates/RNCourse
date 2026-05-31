import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favorites';

// The Redux store — holds all app state
// Access state with useSelector(), dispatch actions with useDispatch()
export const store = configureStore({
  reducer: {
    favoriteMeals: favoritesReducer,
  },
});
