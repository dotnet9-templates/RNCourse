# Maximilian React Native Course

Follow-along project for Udemy's [React Native - The Practical Guide](https://www.udemy.com/course/react-native-the-practical-guide/) by Maximilian Schwarzmüller.

Instructor's source code: https://github.com/academind/react-native-practical-guide-code

---

## Setup

- **Expo SDK:** 51 (instructor uses SDK 44/52 — do not copy their `package.json`)
- **Simulators:** iPhone 16 Pro (iOS 18.6) · Pixel 9 Pro (API 37 / Android 17)
- **Start the app:** `cd RNCourse && npx expo start`
- **If Metro is stale:** `npx expo start --clear`

| Shortcut | Action |
|---|---|
| `i` | Open iOS Simulator |
| `a` | Open Android Emulator (must be running first) |
| `s` | Switch between Expo Go / dev client |
| `r` | Reload |
| Cmd+D | Developer menu (iOS) |
| Cmd+M | Developer menu (Android) |

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
const places = database.getAllSync('SELECT * FROM places');
const place = database.getFirstSync('SELECT * FROM places WHERE id = ?', [id]);
```

### Maps

`react-native-maps` does not work with SDK 51. Use `react-native-webview` with [Leaflet](https://leafletjs.com/) instead. For the map API key, [Geoapify](https://www.geoapify.com/) is a free alternative to Google Maps.
