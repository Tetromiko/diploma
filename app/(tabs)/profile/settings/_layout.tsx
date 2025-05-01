import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(edit)" />
      <Stack.Screen name="(account)" />
      <Stack.Screen name="(additional)" />
      <Stack.Screen name="index" />
    </Stack>
  );
}
