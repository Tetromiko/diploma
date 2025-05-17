import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { ChatItem } from "@/components/ChatPreview";
import { Octicons, AntDesign } from "@expo/vector-icons";
import { ContextMenuContext } from "@/contexts/ContextMenuContext";
import { useFocusEffect } from "@react-navigation/native";
import { getRemoteData } from "@/utils/api";
import { ChatPreview } from "@/constants/types";

const tabs = [
  {
    label: "Всі чати",
    key: "all",
  },
  {
    label: "Друзі",
    key: "private",
  },
  { label: "Групові чати", key: "group" },
  { label: "Дискусії", key: "discussion" },
];

export default function ChatsScreen() {
  const router = useRouter();
  const { showMenu } = useContext(ContextMenuContext);
  
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [chats, setChats] = useState<ChatPreview[]>([]);
  const [categoryChats, setCategoryChats] = useState<ChatPreview[]>([]);
  const [inputValue, setInputValue] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      getRemoteData(`/chats`).then((data) => {
        setChats(data);
      });
    }, [])
  );
  useEffect(() => {
    setCategoryChats(
      chats.filter((chat) => {
        if (activeTab.key === "all") return true;
        return chat.type === activeTab.key;
      })
    );
  }, [activeTab, chats]);

  const handleDeleteChat = (chatId: number) => {
    alert(`Видалити чат ${chatId}`);
  };
  const handleMuteChat = (chatId: number) => {
    alert(`Вимкнути сповіщення для чату ${chatId}`);
  };
  const handlePinChat = (chatId: number) => {
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

        <TouchableOpacity onPress={() => router.push("/chats/create")}>
          <AntDesign name="pluscircleo" size={32} color="#313131" />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <Pressable
            key={tab.key}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>
      <FlatList
        data={categoryChats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <ChatItem
              unreadCount={0}
              chatId={item.id}
              avatarUrl={item?.avatarUrl || ""}
              title={item?.title || "Користувач"}
              onPress={() => router.push(`/chats/${item.id}`)}
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
    fontWeight: "400",
  },
  activeTabText: {
    fontWeight: "500",
  },
});
