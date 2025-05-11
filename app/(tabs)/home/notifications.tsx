import UserWithButton from "@/components/UserWithButton";
import { NotificationData } from "@/constants/types";
import { getRemoteData } from "@/utils/api";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<NotificationData[] | null>(
    null
  );

  useEffect(() => {
    getRemoteData(`/me/notifications`).then((data) => {
      setNotifications(data);
    });
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
        <Text style={styles.headerTitle}>Сповіщення</Text>
        <View style={styles.actionIcon}></View>
      </View>
      <View style={styles.body}>
        {notifications && notifications.length > 0 ? (
          notifications.map((notification) => (
            <UserWithButton
              key={notification.user.id}
              userId={notification.user.id}
              button={
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    alert(`Ви підписались на ${notification.user.fullName}`);
                  }}
                >
                  <Text style={styles.buttonText}>Підписатись</Text>
                </TouchableOpacity>
              }
              description={
                notification.type === "subscription" ? "Підписався" : ""
              }
            />
          ))
        ) : (
          <View style={{ padding: 16, alignItems: "center" }}>
            <Text style={{ color: "#7b7b7b" }}>Сповіщень немає</Text>
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
  fireworkImage: {
    width: 32,
    height: 32,
  },
});
