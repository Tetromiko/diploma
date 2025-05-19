import UserWithButton from "@/components/UserWithButton";
import { NotificationData, UserPublic } from "@/constants/types";
import { getRemoteData, patchRemoteData } from "@/utils/api";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<NotificationData[] | null>(
    null
  );
  const [subscribedIds, setSubscribedIds] = useState<number[]>([]);

  useEffect(() => {
    getRemoteData(`/me/notifications`).then((data) => {
      setNotifications(data);
    });
    getRemoteData<UserPublic[]>(`/me/relations?type=following`).then(
      (users) => {
        const ids = users.map((user) => user.id);
        getRemoteData<UserPublic[]>(`/me/relations?type=friends`).then(
          (friends) => {
            const friendIds = friends.map((user) => user.id);
            const allIds = [...ids, ...friendIds];
            setSubscribedIds(allIds);
          }
        );
      }
    );
  }, []);

  const handleSubscribe = (userId: number) => {
    patchRemoteData(`/users/${userId}/follow`, true);
    setSubscribedIds((prev) => [...prev, userId]);
  };

  const handleUnsubscribe = (userId: number) => {
    patchRemoteData(`/users/${userId}/follow`, false);
    setSubscribedIds((prev) => prev.filter((id) => id !== userId));
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
        <Text style={styles.headerTitle}>Сповіщення</Text>
        <View style={styles.actionIcon}></View>
      </View>
      <View style={styles.body}>
        {notifications && notifications.length > 0 ? (
          notifications.map((notification) => {
            const isSubscribed = subscribedIds.includes(notification.user.id);
            return (
              <UserWithButton
                key={notification.user.id}
                userId={notification.user.id}
                button={
                  notification.type === "friends" ? (
                    <Image
                      source={require("@/assets/images/firework.png")}
                      style={styles.fireworkImage}
                    />
                  ) : isSubscribed ? (
                    <TouchableOpacity
                      style={[styles.button, styles.buttonInactive]}
                      onPress={() => handleUnsubscribe(notification.user.id)}
                    >
                      <Text
                        style={[styles.buttonText, styles.buttonInactiveText]}
                      >
                        Відписатись
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => handleSubscribe(notification.user.id)}
                    >
                      <Text style={styles.buttonText}>Підписатись</Text>
                    </TouchableOpacity>
                  )
                }
                description={
                  notification.type === "friends"
                    ? "Вітаємо, тепер ви друзі"
                    : notification.type === "subscription"
                    ? "Підписався(лась)"
                    : ""
                }
              />
            );
          })
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
  fireworkImage: {
    width: 32,
    height: 32,
  },
});
