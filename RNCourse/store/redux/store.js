import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favorites';

// The store is the single source of truth for all Redux state in the app.
// Every piece of state lives here — no matter which screen you're on.
//
// "reducer" is an object that maps a name to its slice's reducer function.
// You can add more slices here as the app grows, e.g.:
//   reducer: { favoriteMeals: favoritesReducer, user: userReducer }
//
// Access state anywhere with:   useSelector((state) => state.favoriteMeals.ids)
// Send changes anywhere with:   dispatch(addFavorite({ id: mealId }))
export const store = configureStore({
  reducer: {
    favoriteMeals: favoritesReducer,
  },
});
