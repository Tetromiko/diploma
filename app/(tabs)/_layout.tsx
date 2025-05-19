import { Tabs, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Octicons } from "@expo/vector-icons";
import { IconWithBadge } from "@/components/IconWithBadge";
import { useSegments } from "expo-router";
import { getRemoteData } from "@/utils/api";

export default function TabLayout() {
  const segments = useSegments();
  const router = useRouter();
  const page = segments[segments.length - 1];
  const pagesToShowTabBar = ["home", "explore", "chats", "profile"];
  const hideTabBar = !pagesToShowTabBar.includes(page);
  const [messagesActive, setMessagesActive] = useState(false);

  useEffect(() => {
    getRemoteData("/chats").then((data) => {
      //setMessagesActive(data.length > 0);
    });
  }, []);

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
              active={messagesActive}
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
