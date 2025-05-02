import React from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Message, { MessageData } from "./Message";
import { CURRENT_USER_ID } from "@/constants/user";
import { UsersPublic } from "@/constants/data";

interface UserWithButtonProps {
  userId: string;
  button: React.ReactNode;
  description?: string;
}

export default function UserWithButton(props: UserWithButtonProps) {
  //get user public data by userId
  const { button, description } = props;
  const user = UsersPublic.find((user) => user.id === props.userId);
  return (
    <View style={{ position: "relative" }}>
      <View style={styles.mainContainer}>
        <View style={styles.userDataContainer}>
          <Image
            source={{ uri: user?.avatar }}
            style={styles.imageProfileStyle}
          />
          <View style={styles.textContainer}>
            <Text style={styles.userName}>{user ? user.nickname : "User"}</Text>
            {description && (
              <Text style={styles.description}>{description}</Text>
            )}
          </View>
        </View>
        <View style={styles.buttonContainer}>{button}</View>
      </View>
      <View style={[styles.mainContainer, styles.absoluteContainer]}></View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 8,
    height: 64,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#cecece",
    zIndex: 1,
  },
  absoluteContainer: {
    position: "absolute",
    top: 8,
    left: 0,
    right: 0,
    zIndex: 0,
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
