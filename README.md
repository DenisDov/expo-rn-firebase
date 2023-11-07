# Expo app with RN Firebase SDK

Implemented Firebase auth with `Email, Google Sign in, Facebook`

### Getting Started

- npm i
- npx expo

### Installation package example

- npx expo install package-name

### More

- Run “DEBUG=expo:\* npx expo” to view all debug logs
- [Expo CLI](https://docs.expo.dev/more/expo-cli/)

### Tips

While you're developing your project, you can change your simulator's or device's appearance by using the following shortcuts:

- If working with an iOS emulator locally, you can use the Cmd ⌘ + Shift + a shortcut to toggle between light and dark modes.
- If using an Android Emulator, you can run adb shell "cmd uimode night yes" to enable dark mode, and adb shell "cmd uimode night no" to disable dark mode.
- If using a real device or an Android Emulator, you can toggle the system dark mode setting in the device's settings.

## Create native folders after added package with plugin or added new ggogle-services.json from firebase to root folder

`npx expo prebuild --platform android --clean`

## Run on device

`npx expo run:android --device`

## Builds

https://docs.expo.dev/develop/development-builds/create-a-build/#create-a-build-for-the-device

### Prebuild

https://docs.expo.dev/workflow/prebuild/
`npx expo prebuild --platform android` or ios

### Run application for testing purposes with environment

`npx expo run:android --variant debug`
`npx expo run:android --variant release`

### EAS

Build locally with EAS: android .apk: `eas build --platform android --profile development --local`

### Simulate production mode

`npx expo start --no-dev`

## Build .apk for test

-prod: `eas build --platform android --profile preview --local`
-dev: `eas build --platform android --profile development --local`

### Biild android release .aab

`eas build --platform android --local`

### React native google sign in

You need 2 SHA-1 keys for dev and prod at least;
