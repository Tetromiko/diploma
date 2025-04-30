import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import ChatMessage from "./ChatMessage";
import { MessageData } from "./Message";
import { StyleSheet, View } from "react-native";

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
