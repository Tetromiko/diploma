import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import UserWithButton from "@/components/UserWithButton";
import { BlockedIds } from "@/constants/data";

export default function BlockedScreen() {
  const router = useRouter();

  const toggleUserBlock = (userId: string) => {
    console.log(`Toggling block status for user: ${userId}`);
  };

  const isUserBlocked = (userId: string) => {
    return BlockedIds.includes(userId);
  };

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
        <Text style={styles.headerTitle}>Заблоковані користувачі</Text>
        <View style={styles.actionIcon}></View>
      </View>
      <View style={styles.body}>
        {BlockedIds.map((userId) => {
          return (
            <UserWithButton
              key={userId}
              userId={userId}
              button={
                <TouchableOpacity
                  style={
                    isUserBlocked(userId)
                      ? styles.buttonBlock
                      : styles.buttonUnBlocked
                  }
                  onPress={() => {
                    toggleUserBlock(userId);
                  }}
                >
                  <Text
                    style={
                      isUserBlocked(userId)
                        ? styles.unBlockButtonText
                        : styles.blockButtonText
                    }
                  >
                    {isUserBlocked(userId) ? "Розблокувати" : "Заблокувати"}
                  </Text>
                </TouchableOpacity>
              }
              description="ви тепер друзі"
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  header: {
    height: 64,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#cecece",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
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
  buttonBlock: {
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
  buttonUnBlocked: {
    backgroundColor: "#7eaaed",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  blockButtonText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#ffffff",
    textAlign: "center",
  },
  unBlockButtonText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#808080",
    textAlign: "center",
  },
});
