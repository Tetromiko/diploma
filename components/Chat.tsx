import React from "react";
import { ScrollView } from "react-native";
import ChatMessage from "./ChatMessage";
import { StyleSheet, View } from "react-native";
import { MessageData } from "@/constants/types";

interface ChatProps {
  messages: MessageData[];
}

export default function Chat(props: ChatProps) {
  const { messages } = props;
  return (
    <ScrollView>
      <View style={styles.messageList}>
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  messageList: {
    flex: 1,
    gap: 8,
    padding: 16,
  },
});
