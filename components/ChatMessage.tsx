import React, { useEffect } from "react";
import Message from "./Message";
import { MessageData } from "@/constants/types";
import { parseJwt } from "@/utils/api";

interface ChatMessageProps {
  message: MessageData;
}

export default function ChatMessage(props: ChatMessageProps) {
  const { message } = props;
  const [isMine, setIsMine] = React.useState(false);
  const token = localStorage.getItem("token");
  const user = token ? parseJwt(token) : null;
  //id to number
  console.log("user", user.nameid);
  useEffect(() => {
    setIsMine(message.sender.id.toString() === user.nameid);
  });
  console.log("message", message);

  return <Message message={message} isMine={isMine} />;
}
