import { Ionicons } from "@expo/vector-icons";
import UserWithButton from "@/components/UserWithButton";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { getRemoteData } from "@/utils/api";
import { UserPublic } from "@/constants/types";

export default function FriendsScreen() {
  const [users, setUsers] = useState<UserPublic[] | null>(null);

  useEffect(() => {
    getRemoteData(`/me/relations?type=friends`).then(setUsers);
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
        <Text style={styles.headerTitle}>Друзі</Text>
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
                    router.push(`/${user.id}`);
                  }}
                >
                  <Text style={styles.buttonText}>Перейти</Text>
                </TouchableOpacity>
              }
            />
          ))
        ) : (
          <View style={{ padding: 16, alignItems: "center" }}>
            <Text style={{ color: "#7b7b7b" }}>Друзів немає</Text>
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
    backgroundColor: "#ffffff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#cecece",
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#808080",
    textAlign: "center",
  },
});
