import { Dropdown, DropdownOption } from "@/components/Dropdown";
import { Post } from "@/components/Post";
import { Octicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text } from "react-native";
import { StyleSheet, TextInput, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Posts, UsersPublic } from "@/constants/data";

const filters = [
  {
    type: "Актуальність",
    value: ["Актуальні", "Популярні", "Нові"],
  },
  {
    type: "Дата",
    value: ["Сьогодні", "Тиждень", "Місяць"],
  },
];

export default function ExploreScreen() {
  const [inputValue, setInputValue] = useState("");
  const [selectedRelevance, setSelectedRelevance] = useState(
    filters[0].value[0]
  );
  const [selectedDate, setSelectedDate] = useState(filters[1].value[0]);

  const relevanceOptions: DropdownOption[] = filters[0].value.map((label) => ({
    label,
    onSelect: () => setSelectedRelevance(label),
  }));
  const dateOptions: DropdownOption[] = filters[1].value.map((label) => ({
    label,
    onSelect: () => setSelectedDate(label),
  }));

  const [selectedFilters, setSelectedFilters] = useState(
    filters.map((filter) => filter.value[0])
  );

  const dropdowns = filters.map((filter, idx) => {
    const options: DropdownOption[] = filter.value.map((label) => ({
      label,
      onSelect: () => {
        setSelectedFilters((prev) => {
          const updated = [...prev];
          updated[idx] = label;
          return updated;
        });
      },
    }));
    return <Dropdown key={filter.type} options={options} />;
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Octicons name="search" size={24} color="#808080" />
        <TextInput
          value={inputValue}
          onChangeText={setInputValue}
          style={{ outlineColor: "none", outline: "none" }}
        />
      </View>
      <View style={styles.filters}>{dropdowns}</View>
      <FlatList
        style={styles.postsContainer}
        data={Posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postWrapper}>
            <Post
              post={{
                ...item,
                avatar:
                  UsersPublic.find((u) => u.id === item.ownerId)?.avatar || "",
                nickname:
                  UsersPublic.find((u) => u.id === item.ownerId)?.nickname ||
                  "",
              }}
              onMenuPress={(event: any) => {
                const { pageX, pageY } = event.nativeEvent;
                console.log("Menu pressed at", pageX, pageY);
              }}
            />
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              height: 200,
            }}
          >
            <Text style={{ color: "#7b7b7b" }}>Постів немає</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  },
  input: {
    flex: 1,
    height: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 0,
  },
  filters: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 8,
  },
  filterContiner: {
    height: 32,
    paddingHorizontal: 8,
    justifyContent: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#cecece",
    backgroundColor: "#ffffff",
  },
  postsContainer: {},
  postWrapper: {
    marginBottom: 16,
  },
});
