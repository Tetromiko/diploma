import React from "react";
import { StyleSheet, Text, View } from "react-native";

export interface MessageData {
  id: string;
  text: string;
  senderId: string;
  time: string;
  read: boolean;
}

interface MessageProps {
  message: MessageData;
  isMine: boolean;
}

export default function Message(props: MessageProps) {
  const { message, isMine } = props;

  return (
    <View style={{ flexDirection: isMine ? "row-reverse" : "row" }}>
      <View style={[styles.message, isMine && styles.myMessage]}>
        <Text style={[styles.text, isMine && styles.myText]}>
          {message.text}
        </Text>
        <Text style={[styles.time, isMine && styles.myTime]}>
          {message.time}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  message: {
    flexDirection: "column",
    justifyContent: "flex-start",
    borderRadius: 16,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#cecece",
    borderBottomLeftRadius: 0,
    maxWidth: "50%",
  },
  myMessage: {
    backgroundColor: "#7eaaed",

    borderWidth: 0,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 0,
  },
  text: {
    fontWeight: "500",
    fontSize: 14,
    color: "#808080",
  },
  myText: {
    color: "#fff",
  },
  time: {
    fontSize: 12,
    color: "#888",
  },
  myTime: {
    textAlign: "right",
    color: "#fff",
  },
});
