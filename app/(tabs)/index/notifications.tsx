import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IconWithBadge } from "@/components/IconWithBadge";
import { PostStack } from "@/components/PostStack";
import { ContextMenuContext } from "@/contexts/ContextMenuContext";
import { Posts, UsersPublic } from "@/constants/data";
import { CURRENT_USER_ID } from "@/constants/user";

const FEED_OPTIONS = [
  { key: "Home", label: "Delagram" },
  { key: "Followed", label: "Followed" },
  {
    key: "Friends",
    label: "Friends",
  },
];

export default function HomeScreen() {
  const [selectedFeed, setSelectedFeed] = useState(FEED_OPTIONS[0]);
  const { showMenu } = useContext(ContextMenuContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const notMyPosts = Posts.filter((p) => p.ownerId !== CURRENT_USER_ID);
  const shuffled = [...notMyPosts].sort(() => Math.random() - 0.5).slice(0, 4);
  const posts = shuffled.map((item) => ({
    ...item,
    avatar: UsersPublic.find((u) => u.id === item.ownerId)?.avatar || "",
    nickname: UsersPublic.find((u) => u.id === item.ownerId)?.nickname || "",
  }));

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    height: 64,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#cecece",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
