import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Feather, Octicons } from "@expo/vector-icons";
import Chat from "@/components/Chat";
import { getRemoteData } from "@/utils/api";
import {
  ChatData,
  GroupChatData,
  PrivateChatData,
  MessageData,
} from "@/constants/types";
import getUserAvatar from "@/constants/user";
import { postRemoteData } from "@/utils/api";

interface ChatProps {
  info: ChatData;
  additional: PrivateChatData | GroupChatData;
  messages: MessageData[];
}

export default function ChatView() {
  const [chat, setChat] = useState<ChatProps | null>(null);
  const { chatId } = useLocalSearchParams();
  const router = useRouter();
  const [inputHeight, setInputHeight] = useState(32);
  const [avatar, setAvatar] = useState<any>();
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    getRemoteData(`/chats/${chatId}`).then((data) => {
      setChat(data);
    });
  }, []);

  useEffect(() => {
    if (chat) {
      if (chat.info.type === "group") {
        setAvatar(chat?.additional.avatarUrl);
      } else if (chat.info.type === "private") {
        setAvatar(getUserAvatar(chat?.additional.user.avatarUrl));
      }
      setTitle(chat?.additional.title || chat?.additional.user.fullName || "");
    }
  }, [chat]);

  const handleSend = async () => {
    if (message.trim() === "") return;

    try {
      await postRemoteData(`/messages/${chatId}`, { text: message });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }

    getRemoteData(`/chats/${chatId}`).then((data) => {
      setChat(data);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.actionIcon}
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/chats");
            }
          }}
        >
          <Octicons name="chevron-left" size={32} color="#4d4d4d" />
        </TouchableOpacity>
        <View style={styles.chatProps}>
          <View style={styles.chatInfo}>
            <TouchableOpacity
              onPress={() => {
                if (chat?.info.type === "group") {
                  router.push(`/chats/${chatId}/info`);
                } else if (chat?.info.type === "private") {
                  router.push(`/${chat?.additional.user.id}`);
                }
              }}
            >
              <Image style={styles.avatar} source={avatar} />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
          </View>
          <TouchableOpacity style={styles.actionIcon}>
            <Octicons name="gear" size={32} color="#4d4d4d" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <Chat messages={chat?.messages ?? []} />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.actionIcon}>
          <Feather name="paperclip" size={32} color="#999999" />
        </TouchableOpacity>
        <View style={styles.input}>
          <TextInput
            style={[
              styles.inputField,
              {
                outlineColor: "none",
                outline: "none",
                minHeight: 32,
                maxHeight: 120,
                height: inputHeight,
              },
            ]}
            placeholder="Повідомлення"
            placeholderTextColor={"#999999"}
            multiline={true}
            onContentSizeChange={(e) => {
              const newHeight = Math.min(
                Math.max(32, e.nativeEvent.contentSize.height),
                120
              );
              setInputHeight(newHeight);
            }}
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
        </View>
        <TouchableOpacity style={styles.actionIcon} onPress={handleSend}>
          <View style={styles.sendIcon}>
            <Feather name="arrow-up" size={28} color="#ffffff" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  header: {
    height: 64,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#cecece",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 8,
  },
  actionIcon: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  chatProps: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  chatInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
  },
  body: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#cecece",
    padding: 8,
  },
  input: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#cecece",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  inputField: {
    fontWeight: "500",
    fontSize: 14,
    color: "#333333",
    lineHeight: 24,
  },
  sendIcon: {
    backgroundColor: "#7eaaed",
    borderRadius: 24,
    height: 32,
    width: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});
