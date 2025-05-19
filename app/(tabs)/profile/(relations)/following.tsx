import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import UserWithButton from "@/components/UserWithButton";
import { UserPublic } from "@/constants/types";
import { getRemoteData, patchRemoteData, postRemoteData } from "@/utils/api";

export default function FollowingScreen() {
  const [users, setUsers] = useState<UserPublic[] | null>(null);
  const [unsubscribedIds, setUnsubscribedIds] = useState<number[]>([]);

  useEffect(() => {
    getRemoteData(`/me/relations?type=following`).then(setUsers);
  }, []);

  async function handleUnsubscribe(userId: number) {
    patchRemoteData(`/users/${userId}/follow`, false);
    setUnsubscribedIds((prev) => [...prev, userId]);
  }

  async function handleSubscribe(userId: number) {
    patchRemoteData(`/users/${userId}/follow`, true);
    setUnsubscribedIds((prev) => prev.filter((id) => id !== userId));
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.actionIcon}
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="arrow-back" size={32} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Підписки</Text>
        <View style={styles.actionIcon}></View>
      </View>
      <View style={styles.body}>
        {users && users.length > 0 ? (
          users.map((user) => {
            const isSubscribed = !unsubscribedIds.includes(user.id);
            return (
              <UserWithButton
                key={user.id}
                userId={user.id}
                button={
                  isSubscribed ? (
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => handleUnsubscribe(user.id)}
                    >
                      <Text style={styles.buttonText}>Відписатись</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={[styles.button, styles.buttonInactive]}
                      onPress={() => handleSubscribe(user.id)}
                    >
                      <Text
                        style={[styles.buttonText, styles.buttonInactiveText]}
                      >
                        Підписатись
                      </Text>
                    </TouchableOpacity>
                  )
                }
              />
            );
          })
        ) : (
          <View style={{ padding: 16, alignItems: "center" }}>
            <Text style={{ color: "#7b7b7b" }}>Підписок немає</Text>
          </View>
        )}
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
  actionIcon: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
    flex: 1,
    textAlign: "center",
  },
  body: {
    gap: 8,
    padding: 16,
  },
  button: {
    backgroundColor: "#7eaaed",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  buttonInactive: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#cecece",
  },
  buttonInactiveText: {
    color: "#7b7b7b",
  },
});
