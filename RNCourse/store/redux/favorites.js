import { createSlice } from '@reduxjs/toolkit';

// A Redux "slice" is a self-contained piece of state.
// It groups together:
//   - what the state looks like (initialState)
//   - the functions that can change it (reducers)
// Think of it like a mini state machine for one feature.
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    ids: [], // starts as an empty array — no favorites yet
  },
  reducers: {
    // "action" carries the data sent when dispatch() is called.
    // action.payload is the object you pass in, e.g. { id: 'm1' }
    // Redux Toolkit lets you write state.ids.push() safely —
    // it uses a library called Immer that prevents you from accidentally
    // breaking the original state (normally you'd have to copy it first).
    addFavorite: (state, action) => {
      state.ids.push(action.payload.id);
    },
    removeFavorite: (state, action) => {
      state.ids.splice(state.ids.indexOf(action.payload.id), 1);
    },
  },
});

// Export the action creators so screens can call them with dispatch()
// e.g. dispatch(addFavorite({ id: 'm1' }))
export const addFavorite = favoritesSlice.actions.addFavorite;
export const removeFavorite = favoritesSlice.actions.removeFavorite;

// Export the reducer so store.js can register it
export default favoritesSlice.reducer;
