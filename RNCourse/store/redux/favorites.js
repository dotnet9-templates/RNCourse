import { createSlice } from '@reduxjs/toolkit';

// A Redux "slice" bundles the state shape + its reducers together
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    ids: [], // array of favorited meal ids
  },
  reducers: {
    // Redux Toolkit uses Immer under the hood — safe to mutate state directly here
    addFavorite: (state, action) => {
      state.ids.push(action.payload.id);
    },
    removeFavorite: (state, action) => {
      state.ids.splice(state.ids.indexOf(action.payload.id), 1);
    },
  },
});

// Export action creators (used with dispatch())
export const addFavorite = favoritesSlice.actions.addFavorite;
export const removeFavorite = favoritesSlice.actions.removeFavorite;

// Export the reducer (registered in store.js)
export default favoritesSlice.reducer;
