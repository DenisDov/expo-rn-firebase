import "expo-dev-client";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ThemeProvider } from "@shopify/restyle";
import { darkTheme, theme } from "@app/theme";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import Navigation from "@app/navigation";
import { AuthProvider } from "@app/context/auth";

export default function App() {
  const darkMode = true;
  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <AuthProvider>
          <Navigation theme={darkMode ? DarkTheme : DefaultTheme} />
        </AuthProvider>
        <StatusBar style={darkMode ? "light" : "dark"} />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
