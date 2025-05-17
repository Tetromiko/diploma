import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ContextMenuProvider } from "@/contexts/ContextMenuContext";
import { setStorageConfiguration } from "@/utils/storage";
import { Platform } from "react-native";
import { setApiUrl } from "@/utils/api";
import { AuthentificationProvider } from "@/contexts/AuthentificationContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    setStorageConfiguration({ platform: Platform.OS });
    console.log("OS:", Platform.OS);

    if (Platform.OS === "android") {
      setApiUrl("http://10.0.2.2:5226/api");
    } else {
      setApiUrl("https://localhost:7232/api");
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthentificationProvider>
      <ContextMenuProvider>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="+not-found" />
              <Stack.Screen name="authorization" />
              <Stack.Screen name="[userId]" />
            </Stack>
            <StatusBar style="auto" />
          </SafeAreaView>
        </SafeAreaProvider>
      </ContextMenuProvider>
    </AuthentificationProvider>
  );
}
