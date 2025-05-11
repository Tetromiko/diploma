import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Octicons } from "@expo/vector-icons";
import { IconWithBadge } from "@/components/IconWithBadge";
import { useSegments } from "expo-router";

export default function TabLayout() {
  const segments = useSegments();
  const router = useRouter();
  const page = segments[segments.length - 1];
  const pagesToShowTabBar = ["home", "explore", "chats", "profile"];
  const hideTabBar = !pagesToShowTabBar.includes(page);

  const handleTabPress = (route: string) => ({
    tabPress: (e: any) => {
      e.preventDefault();
      router.replace(`/${route}`);
    },
  });

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 64,
          borderTopWidth: 1,
          borderTopColor: "#cecece",
          display: hideTabBar ? "none" : "flex",
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
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <Octicons
              name="home"
              size={32}
              color={focused ? "#000" : "#949494"}
            />
          ),
        }}
        listeners={handleTabPress("home")}
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
        listeners={handleTabPress("explore")}
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
        listeners={handleTabPress("chats")}
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
        listeners={handleTabPress("profile")}
      />
    </Tabs>
  );
}
