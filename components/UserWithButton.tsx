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
  onPress: () => void;
  buttonText: string;
}

export default function UserWithButton(props: UserWithButtonProps) {
  //get user public data by userId
  const isUserBlocked = true;
  const user = UsersPublic.find((user) => user.id === props.userId);
  return (
    <View style={{ position: "relative" }}>
      <View style={styles.mainContainer}>
        <View style={styles.userDataContainer}>
          <Image
            source={{ uri: user?.avatar }}
            style={styles.imageProfileStyle}
          />
          {user && <Text style={styles.userName}>{user.nickname}</Text>}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={isUserBlocked ? styles.buttonBlock : styles.buttonUnBlocked}
            onPress={() => {}}
          >
            <Text
              style={
                isUserBlocked
                  ? styles.unBlockButtonText
                  : styles.blockButtonText
              }
            >
              {isUserBlocked ? "Розблокувати" : "Заблокувати"}
            </Text>
          </TouchableOpacity>
        </View>
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
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
