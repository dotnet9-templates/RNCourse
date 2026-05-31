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

## Section 6 — Navigation (Meals App)

**Topics:** React Navigation v6 · Stack navigator · Drawer navigator · Dynamic header options · Passing params between screens · `useLayoutEffect` for header buttons

**New packages:**

```bash
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/drawer
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated
```

**App structure:**

```
screens/      → CategoriesScreen, MealsOverviewScreen, MealDetailScreen, FavoritesScreen
components/
  CategoryGridTile.js
  IconButton.js
  MealDetails.js
  MealItem.js
  MealDetail/  → List.js, Subtitle.js
data/         → dummy-data.js
models/       → category.js, meal.js
```

**Navigation setup in `App.js`:**

- `DrawerNavigator` — side menu with Categories and Favorites tabs
- `Stack.Navigator` — wraps the drawer, adds `MealsOverview` and `MealDetail` on top of it
- Header title and button are set dynamically via `useLayoutEffect` inside each screen

**Key concept — `useLayoutEffect` for dynamic headers:**

```js
useLayoutEffect(() => {
  navigation.setOptions({ title: categoryTitle });
}, [catId, navigation]);
```

Runs before the first paint so the header title is correct immediately — no flash of a wrong title.

---

## Section 7 — App-Wide State Management (Context API & Redux)

**Topics:** Context API · Redux Toolkit · `useSelector` · `useDispatch` · Redux slices · Comparing Context vs Redux

**New packages:**

```bash
npm install @reduxjs/toolkit react-redux
```

**What changed from Section 6:**

The Favorites feature was wired up — tapping the star on any meal detail screen saves it to the Favorites drawer tab. The state is managed globally with Redux so any screen can read it.

**New folder — `store/`:**

```
store/
  redux/
    favorites.js    → Redux slice (addFavorite / removeFavorite actions)
    store.js        → configureStore — registers all reducers
  context/
    favorites-context.js  → Context API version (kept as reference, commented out)
```

**Redux vs Context — what the instructor shows:**

The instructor builds the favorites feature twice — first with the built-in React Context API, then refactors it to Redux. Both versions are kept in this repo so you can read and compare them side by side.

| Approach | File | Used? |
|---|---|---|
| Redux (active) | `store/redux/` | Yes — default |
| Context API (reference) | `store/context/favorites-context.js` | Commented out |

**Why two approaches?**

- **Context API** is built into React — no extra packages. Good for simple shared state like a theme or a logged-in user. Downside: every component that reads the context re-renders when anything in it changes.
- **Redux** is a dedicated state management library. Better for larger apps where many screens share and update state. Changes are more predictable and easier to debug.

For this app either works fine — the instructor shows both so you understand the trade-off.

**How to switch from Redux → Context (to study the difference):**

1. In `App.js`: comment out `<Provider store={store}>`, uncomment `<FavoritesContextProvider>`
2. In `FavoritesScreen.js`: comment out `useSelector`, uncomment `useContext(FavoritesContext)`
3. In `MealDetailScreen.js`: comment out `useSelector`/`useDispatch`, uncomment `useContext(FavoritesContext)`

The commented-out lines are right next to the Redux lines in each file — they're labeled so you can find them easily.

**How Redux works here:**

```js
// 1. Define actions + reducer in a slice (favorites.js)
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { ids: [] },
  reducers: {
    addFavorite: (state, action) => { state.ids.push(action.payload.id); },
    removeFavorite: (state, action) => { state.ids.splice(...); },
  }
});

// 2. Register in the store (store.js)
configureStore({ reducer: { favoriteMeals: favoritesReducer } });

// 3. Wrap the app in Provider (App.js)
<Provider store={store}> ... </Provider>

// 4. Read state in any component
const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);

// 5. Dispatch actions
const dispatch = useDispatch();
dispatch(addFavorite({ id: mealId }));
```

**`MealsList` component (refactor):**

`MealItem.js` was moved into a new `components/MealsList/` folder and a shared `MealsList.js` wrapper was added. Both `MealsOverviewScreen` and `FavoritesScreen` now use the same component.

---

## State Management — What to Use If This App Grows

This course teaches Context API and Redux. If you were building a real production app (say, connected to a .NET backend), here's what to actually reach for:

**TanStack Query + Zustand** — best combo for most real apps.

```
Data from your API   →  TanStack Query
Everything else      →  Zustand
```

### TanStack Query

Handles everything that comes *from the server* — fetching, caching, loading states, error states, and automatic refetching when data goes stale. Replaces the pattern of `useEffect` + `useState` just to load data. This covers ~80% of what most Redux stores end up holding anyway, and it does it better.

### Zustand

Handles *local app state that isn't from the server* — things like whether a drawer is open, the active theme, or whether a user is logged in. Extremely minimal setup (~10 lines vs Redux's slices/actions/reducers boilerplate). No Provider wrapper required. Also smarter about re-renders than Context API.

### Why not just Redux?

Redux predates TanStack Query. Most Redux stores end up being mostly server-fetched data — TanStack Query replaces all of that automatically. What's left is usually small enough that Zustand handles it fine with far less code.

### Why not just Context API?

Fine for tiny apps. But every component subscribed to a context re-renders whenever *anything* in that context changes — as the app grows, this becomes a real performance problem. Zustand is more surgical about re-renders.

### What about MobX?

MobX is a solid option — especially if you come from an object-oriented background (like .NET/C#). It uses the concept of *observables*: you mark pieces of state as observable, and any component that reads them automatically re-renders when they change. No actions to dispatch, no selectors to write.

**Pros:** Very little boilerplate, feels natural if you're used to OOP, fine-grained re-renders.

**Cons:** "Magic" — it's less obvious what's causing a re-render when something goes wrong. Harder to debug than Redux or Zustand. Smaller community than Redux.

**Bottom line:** MobX is a reasonable choice but Zustand achieves a similar low-boilerplate experience with less magic and easier debugging. For a .NET-connected app, the `TanStack Query + Zustand` combo still wins.

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
