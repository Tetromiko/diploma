import { MessageData } from "@/constants/types";
import getUserAvatar from "@/constants/user";
import { getRemoteData } from "@/utils/api";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

interface ChatItemProps {
  chatId: number;
  avatarUrl: string;
  title: string;
  onPress: () => void;
  onLongPress: (event: any) => void;
  unreadCount?: number;
}

export const ChatItem: React.FC<ChatItemProps> = ({
  chatId,
  avatarUrl,
  title,
  onPress,
  onLongPress,
  unreadCount = 0,
}) => {
  const [message, setMessage] = useState<MessageData | null>(null);
  useEffect(() => {
    getRemoteData(`/chats/${chatId}`).then((data) => {
      console.log(data.messages[data.messages.length - 1]);
      setMessage(data.messages[data.messages.length - 1]);
    });
  }, []);

  function getTime(date: Date | string) {
    if (typeof date === "string") {
      date = new Date(date);
    }
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
  }
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={300}
    >
      <View style={styles.background}></View>
      <View style={styles.chatItem}>
        <Image source={getUserAvatar(avatarUrl)} style={styles.avatar} />
        <View style={styles.dataContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {unreadCount > 0 && (
              <View style={styles.unreadCount}>
                <Text style={styles.unreadCountText}>{unreadCount}</Text>
              </View>
            )}
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.lastMessage} numberOfLines={1}>
              {message?.text}
            </Text>
            <Text style={styles.date}>
              {message && getTime(message?.createdAt || new Date())}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    marginBottom: 8,
  },
  background: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#cecece",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  chatItem: {
    height: 72,
    backgroundColor: "#ffffff",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#cecece",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 8,
    justifyContent: "space-between",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  dataContainer: {
    height: 48,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  messageContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastMessage: {
    fontSize: 14,
    color: "#808080",
    fontWeight: "500",
  },
  title: {
    fontSize: 16,
    color: "#222",
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    color: "#808080",
    fontWeight: "500",
  },
  unreadCount: {
    backgroundColor: "#7eaaed",
    borderRadius: 12,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  unreadCountText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "500",
  },
});
