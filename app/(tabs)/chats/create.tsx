import { getRemoteData } from "@/utils/api";
import { Octicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { UserPublic } from "@/constants/types";
import UserWithButton from "@/components/UserWithButton";
import { FlatList } from "react-native-gesture-handler";
import { router } from "expo-router";

export default function CreateChatScreen() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (text: string) => {
    setInputValue(text);
  };

  const [users, setUsers] = useState<UserPublic[] | null>(null);

  useEffect(() => {
    getRemoteData(`/me/relations?type=followers`).then(setUsers);
  }, []);

  function openChat(userId: number) {
    alert(`Ви відкрили чат з ${userId}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.actionIcon}
          onPress={() => {
            router.back();
          }}
        >
          <Octicons name="arrow-left" size={32} color="#222" />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Octicons name="search" size={24} color="#808080" />
          <TextInput
            value={inputValue}
            onChangeText={handleInputChange}
            style={{ outlineColor: "none", outline: "none" }}
          />
        </View>
      </View>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <UserWithButton
            userId={item.id}
            button={
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  openChat(item.id);
                }}
              >
                <Text style={styles.buttonText}>Відкрити чат</Text>
              </TouchableOpacity>
            }
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{ padding: 16, alignItems: "center" }}>
            <Text style={{ color: "#7b7b7b" }}>
              Немає підписників з якими ви могли б поспілкуватись
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    height: 64,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#cecece",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 16,
  },
  actionIcon: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
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
    borderWidth: 0,
  },
  buttonContainer: {
    backgroundColor: "#7eaaed",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
  },
  listContainer: {
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
});
