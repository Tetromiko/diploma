import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MessageData } from "@/constants/types";

export default function Message(props: {
  message: MessageData;
  isMine: boolean;
}) {
  const { message, isMine } = props;

  // Якщо message має поле createdAt (рядок), перетворіть його у Date
  let time = message.time;
  if (!time && (message as any).createdAt) {
    try {
      time = new Date((message as any).createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      time = "";
    }
  }

  return (
    <View style={{ flexDirection: isMine ? "row-reverse" : "row" }}>
      <View style={[styles.message, isMine && styles.myMessage]}>
        <Text style={[styles.text, isMine && styles.myText]}>
          {message.text}
        </Text>
        <Text style={[styles.time, isMine && styles.myTime]}>{time}</Text>
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
