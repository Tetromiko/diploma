import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="information" />
      <Stack.Screen name="report" />
      <Stack.Screen name="privacy" />
    </Stack>
  );
}
