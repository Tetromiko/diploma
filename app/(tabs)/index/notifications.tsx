import UserWithButton from "@/components/UserWithButton";
import { Notifications } from "@/constants/data";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState, useContext } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function NotificationsScreen() {
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
        {Notifications.map((notification) => {
          {
            notification.type === "follow";
          }
          return (
            <UserWithButton
              userId={notification.userId}
              button={
                notification.type === "subscription" ? (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      console.log("Ви підписалися на користувача");
                    }}
                  >
                    <Text style={styles.buttonText}>Підписатись</Text>
                  </TouchableOpacity>
                ) : (
                  <Image
                    source={require("../../../assets/images/firework.png")}
                    style={styles.fireworkImage}
                  />
                )
              }
              description={
                notification.type === "subscription"
                  ? "Підписався на вас"
                  : "Вітаємо, віднині ви друзі!"
              }
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
