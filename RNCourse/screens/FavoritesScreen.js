import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
// ── SWITCH TO CONTEXT: uncomment these two lines ──
// import { useContext } from 'react';
// import { FavoritesContext } from '../store/context/favorites-context';

import MealsList from '../components/MealsList/MealsList';
import { MEALS } from '../data/dummy-data';

function FavoritesScreen() {
  // useSelector "selects" a piece of the Redux store.
  // state.favoriteMeals comes from the key we set in store.js,
  // and .ids is the array defined in the slice's initialState.
  //
  // ── SWITCH TO CONTEXT: replace the line below with ──
  // const { ids: favoriteMealIds } = useContext(FavoritesContext);
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);

  // We don't store full meal objects — just IDs.
  // Filter the master MEALS list to find the ones the user has starred.
  const favoriteMeals = MEALS.filter((meal) =>
    favoriteMealIds.includes(meal.id)
  );

  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favorite meals yet.</Text>
      </View>
    );
  }

  return <MealsList items={favoriteMeals} />;
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
