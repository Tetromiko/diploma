import { Stack } from "expo-router";

export default function RelationsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="friends" />
      <Stack.Screen name="following" />
      <Stack.Screen name="followers" />
    </Stack>
  );
}
