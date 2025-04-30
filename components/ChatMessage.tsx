import React from "react";
import { Text, View } from "react-native";
import Message, { MessageData } from "./Message";
import { CURRENT_USER_ID } from "@/constants/user";

interface ChatMessageProps {
  message: MessageData;
}

export default function ChatMessage(props: ChatMessageProps) {
  const { message } = props;
  const isMine = message.senderId === CURRENT_USER_ID;

  return <Message message={message} isMine={isMine} />;
}
