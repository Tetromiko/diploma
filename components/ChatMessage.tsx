import React, { useEffect } from "react";
import Message from "./Message";
import { MessageData } from "@/constants/types";
import { getData } from "@/utils/storage";

interface ChatMessageProps {
  message: MessageData;
}

export default function ChatMessage(props: ChatMessageProps) {
  const { message } = props;
  const [isMine, setIsMine] = React.useState(false);
  useEffect(() => {
    getData<string>("token").then((token) => {
      if (!token) {
        return null;
      }
      const tokenId = token.split(".")[1];
      const payload = JSON.parse(atob(tokenId));
      const userId = payload.user_id;
      setIsMine(message.sender.id === userId);
    });
  });
  console.log("message", message);

  return <Message message={message} isMine={isMine} />;
}
