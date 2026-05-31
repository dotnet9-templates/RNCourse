import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
// expo-status-bar controls the appearance of the status bar at the top of the screen
// (time, battery, signal icons). "light" makes those icons white — good for dark backgrounds.
// This comes from the expo-status-bar package (separate from React Native's own StatusBar).
import { StatusBar } from "expo-status-bar";

// Custom components split out into their own files to keep App.js clean
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  // Controls whether the "Add Goal" modal is open or closed
  const [modalIsVisible, setModalIsVisible] = useState(false);

  // Stores the list of goals as an array of { text, id } objects
  const [courseGoals, setCourseGoals] = useState([]);

  // Opens the modal
  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  // Closes the modal
  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  // Adds a new goal to the list, then closes the modal
  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals, // keep all existing goals
      { text: enteredGoalText, id: Math.random().toString() }, // add the new one
    ]);
    endAddGoalHandler();
  }

  // Removes a goal from the list by filtering out the one with the matching id
  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    // <> </> is a React Fragment — lets us return multiple elements without a wrapping View
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        {/* Button to open the add-goal modal */}
        <Button
          title="Add New Goal"
          color="#a065ec"
          onPress={startAddGoalHandler}
        />

        {/* Modal with the text input — only visible when modalIsVisible is true */}
        <GoalInput
          visible={modalIsVisible}
          onAddGoal={addGoalHandler}
          onCancel={endAddGoalHandler}
        />

        {/* FlatList efficiently renders long lists — only renders items currently on screen */}
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
            // keyExtractor tells FlatList how to uniquely identify each item
            keyExtractor={(item) => item.id}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});
