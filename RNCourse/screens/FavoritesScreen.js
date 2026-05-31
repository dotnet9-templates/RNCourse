import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
// import { useContext } from 'react';
// import { FavoritesContext } from '../store/context/favorites-context';

import MealsList from '../components/MealsList/MealsList';
import { MEALS } from '../data/dummy-data';

function FavoritesScreen() {
  // useSelector reads a slice of Redux state
  // Previously done with Context: const { ids } = useContext(FavoritesContext)
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);

  // Filter the full meal list to only show favorited ones
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
