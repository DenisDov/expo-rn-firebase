import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useState, useEffect } from "react";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export function useLoadedAssets() {
  const [appIsReady, setAppIsReady] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          GeistSans: require("../assets/fonts/Geist-Regular.otf"),
          GeistMono: require("../assets/fonts/GeistMono-Regular.otf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setAppIsReady(true);
        // SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return appIsReady;
}
