import { StyleSheet, Text, View, Button, Pressable } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.dummyText}>Another Text</Text>
      <Text style={styles.dummyText}>Hello World!!!!</Text>
      {/*
        NOTE: <Button> renders using the native style of each platform.
        iOS: blue text link (no background) — standard iOS style
        Android: solid blue rounded rectangle — Material Design style
        Same code, different look on each platform — this is intentional.
        To get identical styling on both, use <TouchableOpacity> or <Pressable> with custom styles instead.
      */}
      {/* <Button> — platform-native styling (looks different on iOS vs Android) */}
      <Button title="Click me" onPress={() => alert("Button pressed")} />

      {/* <Pressable> — custom styling, looks the same on both platforms */}
      {/* <Pressable
        onPress={() => alert("Button pressed")}
        style={{ backgroundColor: "#007AFF", padding: 10, borderRadius: 6 }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Click me</Text>
      </Pressable> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  dummyText: {
    margine: 16,
    borderWidth: 2,
    borderColor: "red",
    padding: 16,
  },
});
