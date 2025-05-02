import { Ionicons } from "@expo/vector-icons";
import UserWithButton from "@/components/UserWithButton";
import { router } from "expo-router";
import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { FollowingIds, FollowersIds, UsersPublic } from "@/constants/data";

export default function FriendsScreen() {
  const friendsIds = FollowingIds.filter((id) => FollowersIds.includes(id));
  const friends = UsersPublic.filter((user) => friendsIds.includes(user.id));
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
        {friends.map((user) => (
          <UserWithButton
            key={user.id}
            userId={user.id}
            description={user.name}
            button={
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  console.log(
                    `Ви відписалися від користувача ${user.nickname}`
                  );
                }}
              >
                <Text style={styles.buttonText}>Відписатись</Text>
              </TouchableOpacity>
            }
          />
        ))}
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
