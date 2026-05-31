import { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Modal,  // Modal slides up over the screen — useful for forms and dialogs
  Image,
} from "react-native";

function GoalInput(props) {
  // Tracks what the user is currently typing in the text input
  const [enteredGoalText, setEnteredGoalText] = useState("");

  // Called every time the user types a character — keeps state in sync with input
  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  // Passes the typed goal up to the parent (App.js) and clears the input field
  function addGoalHandler() {
    props.onAddGoal(enteredGoalText);
    setEnteredGoalText("");
  }

  return (
    // animationType="slide" makes the modal slide up from the bottom
    // visible is controlled by the parent via props
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        {/* Decorative image loaded from the local assets folder */}
        <Image
          style={styles.image}
          source={require("../assets/images/goal.png")}
        />

        {/* Controlled input — value is always driven by state */}
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal!"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />

        <View style={styles.buttonContainer}>
          {/* Cancel closes the modal without saving */}
          <View style={styles.button}>
            <Button title="Cancel" onPress={props.onCancel} color="#f31282" />
          </View>
          {/* Add Goal saves the goal and closes the modal */}
          <View style={styles.button}>
            <Button title="Add Goal" onPress={addGoalHandler} color="#b180f0" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#311b6b",
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    color: "#120438",
    borderRadius: 6,
    width: "100%",
    padding: 16,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row", // places the two buttons side by side
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
});
