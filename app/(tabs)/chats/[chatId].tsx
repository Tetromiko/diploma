import React, { useState, useRef, useCallback } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Feather, Octicons } from "@expo/vector-icons";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import ChatMessage from "@/components/ChatMessage";
import { PrivateChats, UsersPublic, Messages } from "@/constants/data";
import Chat from "@/components/Chat";

export default function ChatView() {
  const { chatId } = useLocalSearchParams();
  const router = useRouter();
  const [inputHeight, setInputHeight] = useState(48);

  const chat = PrivateChats.find((c) => c.id === chatId);
  const companion = UsersPublic.find((u) => u.id === chat?.companionId);

  const chatMessages = Messages.filter((m) => m.chatId === chatId);

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
            <TouchableOpacity>
              <Image
                style={styles.avatar}
                source={{ uri: companion?.avatar || "" }}
              />
            </TouchableOpacity>
            <Text style={styles.title}>
              {companion?.nickname || "Користувач"}
            </Text>
          </View>
          <TouchableOpacity style={styles.actionIcon}>
            <Octicons name="gear" size={32} color="#4d4d4d" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <Chat messages={chatMessages} />
      </View>
      <View style={[styles.footer, { height: inputHeight + 16 }]}>
        <TouchableOpacity style={styles.actionIcon}>
          <Feather name="paperclip" size={32} color="#999999" />
        </TouchableOpacity>
        <View style={[styles.input, { height: inputHeight }]}>
          <TextInput
            style={[
              styles.inputField,
              {
                outlineColor: "none",
                outline: "none",
                minHeight: 48,
                maxHeight: 120,
              },
            ]}
            placeholder="Повідомлення"
            placeholderTextColor={"#999999"}
            multiline
            onContentSizeChange={(e) => {
              const newHeight = Math.min(
                Math.max(48, e.nativeEvent.contentSize.height),
                120
              );
              setInputHeight(newHeight);
            }}
          />
        </View>
        <TouchableOpacity style={styles.actionIcon}>
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
