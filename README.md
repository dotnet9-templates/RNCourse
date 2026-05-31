# Maximilian React Native Course

Follow-along project for Udemy's [React Native - The Practical Guide](https://www.udemy.com/course/react-native-the-practical-guide/) by Maximilian Schwarzmüller.

---

## Setup

- **Expo SDK:** 51 (instructor uses SDK 44/52 — do not copy their `package.json`)
- **Simulators:** iPhone 16 Pro (iOS 18.6) · Pixel 9 Pro (API 37 / Android 17)
- **Start the app:** `cd RNCourse && npx expo start`
- **If Metro is stale:** `npx expo start --clear`

| Shortcut | Action                                        |
| -------- | --------------------------------------------- |
| `i`      | Open iOS Simulator                            |
| `a`      | Open Android Emulator (must be running first) |
| `s`      | Switch between Expo Go / dev client           |
| `r`      | Reload                                        |
| Cmd+D    | Developer menu (iOS)                          |
| Cmd+M    | Developer menu (Android)                      |

---

## Section 4 — Guess My Number Game

**Topics:** Core components deep dive · Complex layouts · Custom fonts · Reusable component architecture · Multiple screens

**New packages:**

```bash
npx expo install expo-linear-gradient expo-font expo-splash-screen
```

**Components structure:**

```
components/
  ui/         → PrimaryButton, Card, Title, InstructionText
  game/       → NumberContainer, GuessLogItem
screens/      → StartGameScreen, GameScreen, GameOverScreen
constants/    → colors.js
```

### Instructor vs. SDK 51 fixes

**`expo-app-loading` is deprecated — replace with `expo-splash-screen`:**

```js
// Instructor's code (broken — package no longer exists)
import AppLoading from "expo-app-loading";
if (!fontsLoaded) return <AppLoading />;

// SDK 51 fix
import * as SplashScreen from "expo-splash-screen";
import { useState, useCallback } from "react";

const onLayoutRootView = useCallback(async () => {
  if (fontsLoaded) await SplashScreen.hideAsync();
}, [fontsLoaded]);

if (!fontsLoaded) return null;
// Add onLayout={onLayoutRootView} to the root SafeAreaView
```

**Components folder double-nesting:** If you copy the instructor's files and get `Unable to resolve "../components/ui/..."`, check that the files landed at `components/ui/` not `components/components/ui/`. Move them up one level if needed.

---

## Section 5 — Adaptive UIs (built on top of Section 4)

**Topics:** Responsive layouts · Platform-specific code · `useWindowDimensions` · `KeyboardAvoidingView` · `ScrollView` · Platform file extensions (`.ios.js` / `.android.js`)

**No new packages needed** — builds directly on the Section 4 project.

### Key concepts introduced

**`useWindowDimensions`** — dynamically reads the screen size so layouts adapt to orientation changes and different devices:

```js
const { width, height } = useWindowDimensions();
const marginTopDistance = height < 380 ? 30 : 100; // compact layout in landscape
```

**`KeyboardAvoidingView` + `ScrollView`** — prevents the keyboard from covering the input on the start screen:

```js
<ScrollView style={styles.screen}>
  <KeyboardAvoidingView style={styles.screen} behavior="position">
    ...
  </KeyboardAvoidingView>
</ScrollView>
```

**Platform-specific file extensions** — React Native auto-picks the right file based on platform. No `if/else` needed:

```
components/ui/Title.ios.js      → loaded on iPhone
components/ui/Title.android.js  → loaded on Android
constants/colors.ios.js
constants/colors.android.js
```

**Landscape layout swap in `GameScreen`** — when width > 500 (landscape), the buttons move beside the number instead of above/below it:

```js
if (width > 500) {
  content = ( /* horizontal layout */ );
}
```

### Instructor vs. SDK 51 fixes

Same `expo-app-loading` fix as Section 4 applies here — the instructor's `App.js` still uses it. Use the `expo-splash-screen` replacement documented in Section 4 above.

The platform file extensions (`.ios.js`, `.android.js`) work identically on SDK 51 — no changes needed.

---

## Known API Differences

### expo-image-picker

```js
// Instructor (broken)
const uri = image.uri;

// SDK 51
const uri = image.assets[0].uri;
```

### expo-sqlite

```js
// SDK 51 — synchronous API, no promise chains needed
const places = database.getAllSync("SELECT * FROM places");
const place = database.getFirstSync("SELECT * FROM places WHERE id = ?", [id]);
```

### Maps

`react-native-maps` does not work with SDK 51. Use `react-native-webview` with [Leaflet](https://leafletjs.com/) instead. For the map API key, [Geoapify](https://www.geoapify.com/) is a free alternative to Google Maps.
