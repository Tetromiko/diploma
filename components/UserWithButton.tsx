import { UserPublic } from "@/constants/types";
import getUserAvatar from "@/constants/user";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function UserWithButton(props: {
  userId: number;
  button?: React.ReactNode;
  description?: string;
}) {
  const { button, description } = props;

  const [user, setUser] = useState<UserPublic | null>(null);

  const avatar = getUserAvatar(user?.avatarUrl || "");

  const [userDescription, setUserDescription] = useState("");

  function getDescription(text: string | undefined) {
    if (text === undefined) {
      return "";
    }
    if (text.trim() === "") {
      return "";
    }
    if (text.length > 40) {
      return text.slice(0, 40).concat("...");
    }
    return text;
  }

  useEffect(() => {
    fetch(`https://localhost:7232/api/users/${props.userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.warn("API error:", err);
      });
  }, [props.userId]);

  return (
    <View style={styles.container}>
      <View style={styles.absoluteContainer}></View>
      <View style={styles.userContainer}>
        <View style={styles.userDataContainer}>
          <TouchableOpacity
            onPress={() => {
              router.push(`/${user?.id}`);
            }}
          >
            <Image source={avatar} style={styles.imageProfileStyle} />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.userName}>{user?.fullName || "user"}</Text>
            <Text style={styles.description}>
              {description ? description : getDescription(user?.description)}
            </Text>
          </View>
        </View>
        {button && <View style={styles.buttonContainer}>{button}</View>}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 72,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 8,
    height: 64,

    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#cecece",
  },
  absoluteContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#cecece",
    position: "absolute",
    height: 64,
    width: "100%",
    bottom: 0,
  },
  imageProfileStyle: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  userDataContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: "400",
    flex: 1,
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  description: {
    fontSize: 12,
    fontWeight: "400",
    color: "#888",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
