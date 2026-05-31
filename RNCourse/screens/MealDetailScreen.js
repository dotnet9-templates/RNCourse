import { useLayoutEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// ── SWITCH TO CONTEXT: uncomment these two lines ──
// import { useContext } from 'react';
// import { FavoritesContext } from '../store/context/favorites-context';

import IconButton from '../components/IconButton';
import List from '../components/MealDetail/List';
import Subtitle from '../components/MealDetail/Subtitle';
import MealDetails from '../components/MealDetails';
import { MEALS } from '../data/dummy-data';
import { addFavorite, removeFavorite } from '../store/redux/favorites';

function MealDetailScreen({ route, navigation }) {
  // useSelector — reads current favorites from the Redux store (read-only)
  // useDispatch — gives us a function to send actions that change the store
  //
  // ── SWITCH TO CONTEXT: replace the two lines below with ──
  // const favoriteMealsCtx = useContext(FavoritesContext);
  // Then use favoriteMealsCtx.ids, favoriteMealsCtx.addFavorite(), etc.
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
  const dispatch = useDispatch();

  // route.params carries the data passed when navigating here
  // e.g. navigation.navigate('MealDetail', { mealId: 'm1' })
  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  // Check if this meal is already in the favorites list
  const mealIsFavorite = favoriteMealIds.includes(mealId);

  function changeFavoriteStatusHandler() {
    if (mealIsFavorite) {
      // Remove: dispatch sends the removeFavorite action to the Redux store
      dispatch(removeFavorite({ id: mealId }));
    } else {
      // Add: the store's favoriteMeals.ids array gets this id pushed in
      dispatch(addFavorite({ id: mealId }));
    }
  }

  // useLayoutEffect fires before the screen paints, so the star icon
  // appears in the header immediately without a visible delay.
  // The icon switches between 'star' (filled) and 'star-outline' based on mealIsFavorite.
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon={mealIsFavorite ? 'star' : 'star-outline'}
          color="white"
          onPress={changeFavoriteStatusHandler}
        />
      ),
    });
  }, [navigation, changeFavoriteStatusHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: '100%',
    height: 350,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
    color: 'white',
  },
  detailText: {
    color: 'white',
  },
  listOuterContainer: {
    alignItems: 'center',
  },
  listContainer: {
    width: '80%',
  },
});
