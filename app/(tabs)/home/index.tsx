import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IconWithBadge } from "@/components/IconWithBadge";
import { PostStack } from "@/components/PostStack";
import { ContextMenuContext } from "@/contexts/ContextMenuContext";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { getRemoteData } from "@/utils/api";
import { PostData } from "@/constants/types";

const FEED_OPTIONS = [
  { key: "Home", label: "Delagram" },
  { key: "Following", label: "Following" },
  {
    key: "Friends",
    label: "Friends",
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [selectedFeed, setSelectedFeed] = useState(FEED_OPTIONS[0]);
  const { showMenu } = useContext(ContextMenuContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [posts, setPosts] = useState<number[]>([]);
  const [notificationsActive, setNotificationsActive] = useState(false);

  function changeFeed(key: string) {
    getRemoteData(`/posts/feed?category=${key.toLowerCase()}&limit=${5}`).then(
      (data) => {
        setPosts(data.map((post: PostData) => post.id));
      }
    );
  }

  function getNotificationsState() {
    getRemoteData("/me/notifications").then((data) => {
      setNotificationsActive(data.length > 0);
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      changeFeed(selectedFeed.key);
      getNotificationsState();
    }, [selectedFeed])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.logoRow}
          onPress={(event: any) => {
            const { pageX } = event.nativeEvent;
            setMenuOpen(true);
            showMenu({
              x: pageX,
              y: 50,
              menuOptions: FEED_OPTIONS.map((option) => ({
                label: option.key,
                onPress: () => {
                  setSelectedFeed(option);
                  changeFeed(option.key);
                },
              })),
              onClosed: () => setMenuOpen(false),
            });
          }}
        >
          <Text style={styles.appName}>{selectedFeed.label}</Text>
          <Ionicons
            name={menuOpen ? "chevron-up" : "chevron-down"}
            size={20}
            color="#000"
            style={{ marginLeft: 4 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionIcon}
          onPress={() => {
            router.push("/home/notifications");
          }}
        >
          <IconWithBadge
            name="bell"
            size={32}
            color="#313131"
            active={notificationsActive}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <PostStack posts={posts} />
      </View>
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
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  appName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  dropdown: {
    position: "absolute",
    top: 32,
    left: 0,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 6,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    minWidth: 220,
  },
  dropdownItem: {
    padding: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: "#222",
  },
  actionIcon: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#808080",
  },
});
