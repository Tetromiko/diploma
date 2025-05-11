import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import UserWithButton from "@/components/UserWithButton";
import { getRemoteData } from "@/utils/api";
import { UserPublic } from "@/constants/types";

export default function FollowersScreen() {
  const [users, setUsers] = useState<UserPublic[] | null>(null);

  useEffect(() => {
    getRemoteData(`/me/relations?type=followers`).then(setUsers);
  }, []);

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
        <Text style={styles.headerTitle}>Підписники</Text>
        <View style={styles.actionIcon}></View>
      </View>
      <View style={styles.body}>
        {users && users.length > 0 ? (
          users.map((user) => (
            <UserWithButton
              key={user.id}
              userId={user.id}
              button={
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    alert(`${user.fullName} більше не ваш підписник`);
                  }}
                >
                  <Text style={styles.buttonText}>Видалити</Text>
                </TouchableOpacity>
              }
            />
          ))
        ) : (
          <View style={{ padding: 16, alignItems: "center" }}>
            <Text style={{ color: "#7b7b7b" }}>Підписників немає</Text>
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
    gap: 16,
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
});
