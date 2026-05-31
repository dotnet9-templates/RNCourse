// ─────────────────────────────────────────────────────────────
// CONTEXT API VERSION — kept as reference only.
// The app currently uses Redux (store/redux/) instead.
//
// Context API is built into React — no extra packages needed.
// It lets you share state across components without passing
// props down through every level (called "prop drilling").
//
// To switch the app from Redux → Context:
//   1. In App.js:          uncomment FavoritesContextProvider, comment out Provider
//   2. In FavoritesScreen: uncomment useContext lines, comment out useSelector
//   3. In MealDetailScreen: uncomment useContext lines, comment out useSelector/useDispatch
// ─────────────────────────────────────────────────────────────
import { createContext, useState } from 'react';

// createContext sets up the "shape" of the data this context will share.
// The default values here are just for editor autocomplete — they're
// replaced by the real values inside FavoritesContextProvider below.
export const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

// The Provider component wraps the whole app (in App.js).
// Any child component can then call useContext(FavoritesContext)
// to read ids, addFavorite, or removeFavorite.
function FavoritesContextProvider({ children }) {
  const [favoriteMealIds, setFavoriteMealIds] = useState([]);

  function addFavorite(id) {
    // Spread into a new array so React detects the state change
    setFavoriteMealIds((currentFavIds) => [...currentFavIds, id]);
  }

  function removeFavorite(id) {
    setFavoriteMealIds((currentFavIds) =>
      currentFavIds.filter((mealId) => mealId !== id)
    );
  }

  // value is what every child component receives when they useContext()
  const value = {
    ids: favoriteMealIds,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContextProvider;
