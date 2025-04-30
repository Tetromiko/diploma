import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="nickname" />
      <Stack.Screen name="description" />
      <Stack.Screen name="privacy" />
      <Stack.Screen name="blocked" />
    </Stack>
  );
}
