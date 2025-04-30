import React, { useState, useContext } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { ChatItem } from "@/components/ChatItem";
import { Octicons, AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { ContextMenuContext } from "@/contexts/ContextMenuContext";
import {
  PrivateChats,
  UsersPublic,
  Messages,
  FollowingIds,
  FollowerIds,
} from "@/constants/data";

const tabs = ["Всі чати", "Друзі", "Групові чати", "Дискусії"];

function isFriend(userId: string) {
  return FollowingIds.includes(userId) && FollowerIds.includes(userId);
}

function getChatList(tab: string) {
  if (tab === "Всі чати") return PrivateChats;
  if (tab === "Друзі")
    return PrivateChats.filter((chat) => isFriend(chat.companionId));
  if (tab === "Групові чати") return [];
  if (tab === "Дискусії") return [];
  return [];
}

export default function ChatsScreen() {
  const router = useRouter();
  const { showMenu } = useContext(ContextMenuContext);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const chats = getChatList(activeTab);
  const [inputValue, setInputValue] = useState("");

  const handleDeleteChat = (chatId: string) => {
    alert(`Видалити чат ${chatId}`);
  };
  const handleMuteChat = (chatId: string) => {
    alert(`Вимкнути сповіщення для чату ${chatId}`);
  };
  const handlePinChat = (chatId: string) => {
    alert(`Прикріпити чат ${chatId}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Octicons name="search" size={24} color="#808080" />
          <TextInput
            value={inputValue}
            onChangeText={setInputValue}
            style={{ outlineColor: "none", outline: "none" }}
          />
        </View>

        <TouchableOpacity onPress={() => router.push("/chats/new")}>
          <AntDesign name="pluscircleo" size={32} color="#313131" />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <Pressable
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const companion = UsersPublic.find((u) => u.id === item.companionId);
          const chatMsgs = Messages.filter((m) => m.chatId === item.id);
          const lastMsg =
            chatMsgs.length > 0
              ? chatMsgs[chatMsgs.length - 1]?.text
              : "Чат починається";
          const unreadCount = chatMsgs
            .filter((m) => m.chatId === item.id)
            .filter((m) => !m.read).length;
          return (
            <ChatItem
              unreadCount={unreadCount}
              avatar={companion?.avatar || ""}
              title={companion?.nickname || "Користувач"}
              lastMessage={lastMsg}
              onPress={() => router.push(`/chats/${item.id}`)}
              onAvatarPress={() => router.push(`/${companion?.id}`)}
              onLongPress={(event: any) => {
                const { pageX, pageY } = event.nativeEvent;
                showMenu({
                  x: pageX,
                  y: pageY,
                  menuOptions: [
                    {
                      label: "Видалити чат",
                      onPress: () => handleDeleteChat(item.id),
                      style: { color: "#ff0000" },
                    },
                    {
                      label: "Вимкнути сповіщення",
                      onPress: () => handleMuteChat(item.id),
                    },
                    {
                      label: "Прикріпити",
                      onPress: () => handlePinChat(item.id),
                    },
                  ],
                });
              }}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 0,
    backgroundColor: "transparent",
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
    gap: 16,
    paddingVertical: 8,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#cecece",
    borderRadius: 24,
    borderWidth: 1,
    height: 48,
    paddingHorizontal: 16,
    gap: 8,
    flex: 1,
  },
  input: {
    flex: 1,
    height: 16,
    backgroundColor: "#FFFFFF",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  tab: {
    height: 32,
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: "#ffffff",
    borderColor: "#cecece",
    borderRadius: 16,
    borderWidth: 1,
  },
  tabText: {
    fontSize: 16,
    color: "#808080",
    fontWeight: "500",
  },
});
