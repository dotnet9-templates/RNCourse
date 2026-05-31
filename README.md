# Maximilian React Native Course

https://github.com/academind/react-native-practical-guide-code
https://github.com/academind/react-native-practical-guide-code/tree/02-basics/code

Follow-along project for Udemy's [React Native - The Practical Guide](https://www.udemy.com/course/react-native-the-practical-guide/) by Maximilian Schwarzmüller.

## Prerequisites

- [Node.js](https://nodejs.org/) installed
- [Expo Go 2.31.2](https://github.com/expo/expo/releases) on your device

## Previewing the App (Mac)

You have several options to preview the app on Mac:

### Option 1: iOS Simulator (recommended)

- Install **Xcode** from the Mac App Store (free, ~15GB)
- Run `npx expo start` then press `i` in the terminal
- Opens an iPhone simulator directly on your Mac — no physical device needed

### Option 2: Android Emulator

1. Download **Android Studio Panda 4** from [developer.android.com/studio](https://developer.android.com/studio) — pick the **Apple chip** version on a Mac with M-series chip
2. Open the `.dmg`, drag Android Studio to Applications, and launch it
3. Complete the setup wizard — accept all license agreements for each item listed
4. Once open, click **More Actions → Virtual Device Manager**
5. Click **Create virtual device...**
6. Select **Pixel 9 Pro** → Next
7. Select system image **API 37** (download it if needed, ~2.2GB) → Next → Finish
8. Click the **play ▶ button** to boot the emulator — wait for the Android home screen to appear
9. Back in your terminal, run `npx expo start` then press `a`

> You do **not** need to open your project in Android Studio. It's only used to run the emulator.

### Option 3: Physical iPhone with Expo Go

- Download **Expo Go** from the App Store on your iPhone
- Run `npx expo start` and scan the QR code
- Make sure you have version **2.31.2** to match SDK 51 — the latest App Store version may not work

### Option 4: Physical Android with Expo Go

- Download **Expo Go** from the Google Play Store
- Run `npx expo start` and scan the QR code
- Make sure you have version **2.31.2** to match SDK 51

### Option 5: Web browser

- Run `npx expo start` then press `w`
- Opens the app in your browser — useful for quick checks but not a perfect representation of mobile UI

> The **iOS Simulator** via Xcode is the easiest option on Mac — no phone needed and it closely matches a real iPhone.

### Starting the simulator correctly

Once Xcode is installed:

1. `cd` into the `RNCourse` app folder (not the repo root)
2. Run `npx expo start`
3. Press `s` to switch to **Expo Go** mode
4. Press `i` to launch the iOS Simulator

Expo handles everything automatically — you do not need to open Xcode or the Simulator app manually. The first boot takes ~30 seconds; after that it's much faster.

Once the app is running in the simulator, press **Cmd + D** to open the Expo developer menu (reload, toggle inspector, etc.).

### Simulators used in this project

| Platform         | Device                            |
| ---------------- | --------------------------------- |
| iOS Simulator    | iPhone 16 Pro (iOS 18.6)          |
| Android Emulator | Pixel 9 Pro (API 37 / Android 17) |

### Developer menu shortcuts

| Platform         | Open developer menu                               |
| ---------------- | ------------------------------------------------- |
| iOS Simulator    | **Cmd + D**                                       |
| Android Emulator | **Cmd + M** (Mac) or **Ctrl + M** (Windows/Linux) |
| Physical device  | Shake the phone                                   |

### iOS vs. Android — will it work the same?

Mostly yes. React Native is cross-platform so the vast majority of your code works on both. The instructor tests on Android, but following along on the iOS Simulator is fine. Minor differences you may notice:

| Area            | Difference                                             |
| --------------- | ------------------------------------------------------ |
| Shadows         | iOS uses `shadow*` props; Android uses `elevation`     |
| Overflow        | `overflow: hidden` behaves slightly differently        |
| Fonts           | Built-in font names differ per platform                |
| Back navigation | iOS has swipe-back gesture; Android uses a back button |
| Permissions     | Camera, location, notifications may prompt differently |

For this course, you won't hit many of these edge cases. When you do, React Native's built-in `Platform` API handles it:

```js
import { Platform } from "react-native";

const padding = Platform.OS === "ios" ? 20 : 10;
```

## Getting Started (Lesson 1 — May 2026)

> **Note:** The instructor's recordings use Expo SDK 44 (from ~2021), which no longer runs on modern hardware. This project uses **Expo SDK 51** — the oldest version that works reliably in 2026. You can follow along for the vast majority of lessons. See [Full Course Setup](#full-course-setup) for details on what differs.

### 1. Create the project

```bash
npx create-expo-app@latest RNCourse --template blank@sdk-51
cd RNCourse
```

The `--template blank@sdk-51` flag pins the project to **Expo SDK 51**. Without it, `create-expo-app` defaults to the latest SDK (currently 52+) which breaks the course code.

After creation you'll see vulnerability warnings — this is expected with SDK 51 and can be ignored:

```
26 vulnerabilities (1 low, 13 moderate, 12 high)
```

Do **not** run `npm audit fix --force`. It will upgrade packages and break compatibility. Open `package.json` and confirm you see `"expo": "~51.0.x"` in the dependencies.

### 2. Start the app

Navigate into the project and start the dev server:

```bash
cd RNCourse
npx expo start
```

Scan the QR code with **Expo Go 2.31.2** on your device. Do not use the latest Expo Go — it targets a newer SDK and will show a version mismatch error.

> You can find older Expo Go releases at [github.com/expo/expo/releases](https://github.com/expo/expo/releases).

---

## Extra Files You May See (AI Tooling)

If you're using Cursor or Claude to follow along, your project folder may contain a few extra files that the instructor's doesn't:

- **`.claude/settings.json`** — created by Claude (Anthropic's AI assistant). Enables the official Expo plugin for Claude (`expo@claude-plugins-official`), which gives Claude extra context about Expo APIs and project structure so it can give more accurate suggestions. Has no effect on your app — it only affects how Claude behaves when assisting you.
- **`.claude/`** — the folder containing the above settings file.
- **`CLAUDE.md`** — a configuration file for Claude.
- **`AGENTS.md`** — used by AI coding agents (like Claude or Cursor) to understand how to work in your project.

These are automatically generated by AI tools and are completely harmless. They do not affect how your React Native app runs. The instructor simply doesn't have them because they aren't using the same AI tooling.

The instructor's project also has a **`.vscode/`** folder, which VS Code creates when workspace-specific editor settings are saved. Since Cursor is built on top of VS Code, you're already using the same underlying editor — you just may not have that folder yet, and that's fine.

**Summary:**

- You can safely delete `.claude/`, `CLAUDE.md`, and `AGENTS.md` with no impact on the app.
- `.vscode/` won't appear automatically — it only shows up if VS Code saves a workspace setting.
- `npm install` is unrelated to any of these folders.

---

## Full Course Setup

### Should you match the instructor's exact versions?

**No.** The instructor's recordings use Expo SDK 44, React 17, and React Native 0.64 from ~2021. These are no longer supported and won't run on modern hardware. Do not try to downgrade to them.

**SDK 51 is the recommended setup** — it's close enough to the course that you can follow along for the vast majority of lessons. When something looks different from the instructor, check the [Known API Differences](#known-api-differences-from-course-code) section — the fix is likely already documented there.

### Compatible package versions (as of May 2026)

| Package          | Instructor's version | Working version (SDK 51) |
| ---------------- | -------------------- | ------------------------ |
| Expo SDK         | ~44.0.0              | ~51.0.28                 |
| React            | 17.0.1               | 18.2.0                   |
| React Native     | 0.64.3               | 0.74.5                   |
| Reanimated       | —                    | 3.10.1                   |
| React Navigation | v6                   | v6                       |
| Expo Go          | ~2.x                 | 2.31.2                   |
| Axios            | —                    | 0.27.2                   |

> All other Expo packages should be installed to match SDK 51.

### What will break vs. what won't

| Topic                            | Works on SDK 51?                             |
| -------------------------------- | -------------------------------------------- |
| Core components, styling, state  | ✅ Yes                                       |
| Navigation (React Navigation v6) | ✅ Yes                                       |
| expo-image-picker                | ⚠️ Works, but URI access differs (see below) |
| expo-sqlite                      | ⚠️ Works, but API is different (see below)   |
| react-native-maps                | ❌ No — use Leaflet via WebView instead      |

### Install navigation (v6)

```bash
npm install @react-navigation/native@^6 @react-navigation/native-stack@^6
npm install @react-navigation/drawer@^6 @react-navigation/bottom-tabs@^6
npx expo install react-native-screens react-native-safe-area-context
npx expo install react-native-gesture-handler react-native-reanimated@~3.10.1
```

### Install other course packages

```bash
npx expo install expo-image-picker expo-sqlite expo-location react-native-webview
npm install axios@0.27.2
```

### Configure Reanimated in `babel.config.js`

```js
module.exports = function (babel) {
  return {
    presets: ["babel-preset-expo"],
    plugins: ["react-native-reanimated/plugin"], // must be last
  };
};
```

---

## Known API Differences from Course Code

### expo-image-picker

```js
// Course code (broken)
const uri = image.uri;

// Correct
const uri = image.assets[0].uri;
```

### expo-sqlite

The updated SQLite API is synchronous — no more promise chains or error handling boilerplate.

```js
// Fetch all rows
const places = database.getAllSync("SELECT * FROM places");

// Fetch single row
const place = database.getFirstSync("SELECT * FROM places WHERE id = ?", [id]);
```

### Maps

`react-native-maps` does not work with this setup. Use `react-native-webview` with [Leaflet](https://leafletjs.com/) instead. The HTML map code lives in `Map.js` and props are passed back to React Native via `useRef`.

For the map API key, [Geoapify](https://www.geoapify.com/) is a free alternative to Google Maps — no credit card required and the implementation is nearly identical.
