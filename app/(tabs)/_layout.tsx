import { Tabs } from "expo-router";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Octicons } from "@expo/vector-icons";
import { IconWithBadge } from "@/components/IconWithBadge";
import { useSegments } from "expo-router";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const segments = useSegments();
  const page = segments[segments.length - 1];
  const pagesToHideTabBar = ["settings", "[chatId]"];

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 64,
          borderTopWidth: 1,
          borderTopColor: "#cecece",
          display: pagesToHideTabBar.includes(page) ? "none" : "flex",
        },
        tabBarItemStyle: {
          height: 64,
          justifyContent: "center",
          alignItems: "center",
          padding: 8,
        },
        tabBarIconStyle: {
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Octicons
              name="home"
              size={32}
              color={focused ? "#000" : "#949494"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ focused }) => (
            <Octicons
              name="search"
              size={32}
              color={focused ? "#000" : "#949494"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          tabBarIcon: ({ focused }) => (
            <IconWithBadge
              name="mail"
              size={32}
              color={focused ? "#000" : "#949494"}
              active={true}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Octicons
              name="person"
              size={32}
              color={focused ? "#000" : "#949494"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
