import React, { useContext, useEffect } from "react";
import Message from "./Message";
import { MessageData } from "@/constants/types";
import { getData } from "@/utils/storage";
import { ContextMenuContext } from "@/contexts/ContextMenuContext";
import { TouchableOpacity } from "react-native";
import { deleteRemoteData } from "@/utils/api";

interface ChatMessageProps {
  message: MessageData;
}

export default function ChatMessage(props: ChatMessageProps) {
  const { message } = props;
  const [isMine, setIsMine] = React.useState(false);
  const { showMenu } = useContext(ContextMenuContext);

  useEffect(() => {
    getData<string>("token").then((token) => {
      if (!token) {
        setIsMine(false);
        return;
      }
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.nameid;
      setIsMine(message.sender.id == userId);
    });
  }, [message.sender.id]);

  function handleDeleteMessage(messageId: number) {
    deleteRemoteData(`/messages/${messageId}`).then(() => {
      alert("Повідомлення видалено");
    });
  }

  const myMessageOptions = [
    { label: "Видалити", onPress: () => handleDeleteMessage(message.id) },
    { label: "Скопіювати", onPress: () => alert("Скопійовано") },
  ];
  const foreignMessageOptions = [
    { label: "Поскаржитись", onPress: () => alert("Поскаржитись") },
    { label: "Скопіювати", onPress: () => alert("Скопійовано") },
  ];

  function handleLongPress(event: any) {
    const { pageX, pageY } = event.nativeEvent || {};
    showMenu({
      x: pageX ?? 0,
      y: pageY ?? 0,
      menuOptions: isMine ? myMessageOptions : foreignMessageOptions,
    });
  }

  return (
    <TouchableOpacity activeOpacity={1} onLongPress={handleLongPress}>
      <Message message={message} isMine={isMine} />
    </TouchableOpacity>
  );
}
