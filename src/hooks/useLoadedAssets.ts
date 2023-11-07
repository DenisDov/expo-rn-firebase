import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export function useLoadedAssets() {
  const [loaded, error] = useFonts({
    GeistSans: require("../assets/fonts/Geist-Regular.otf"),
    GeistMono: require("../assets/fonts/GeistMono-Regular.otf"),
    ...Ionicons.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return loaded;
}
