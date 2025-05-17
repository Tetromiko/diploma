import { Dropdown, DropdownOption } from "@/components/Dropdown";
import { Octicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, View, ScrollView, Text } from "react-native";
import UserWithButton from "@/components/UserWithButton";
import { getRemoteData } from "@/utils/api";
import { UserPublic } from "@/constants/types";
import { PostData } from "@/constants/types";
import { Post } from "@/components/Post";

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

function shuffleArray<T>(arr: T[]): T[] {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

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

  const [users, setUsers] = useState<UserPublic[] | null>(null);
  const [posts, setPosts] = useState<PostData[] | null>(null);
  const [randomUsers, setRandomUsers] = useState<UserPublic[]>([]);
  const [randomPosts, setRandomPosts] = useState<PostData[]>([]);

  useEffect(() => {
    getRemoteData("/users/random?limit=10").then((data) => {
      console.log("Random users:", data);
      setRandomUsers(data);
    });
    getRemoteData("/posts/random?limit=10").then((data) =>
      setRandomPosts(data)
    );
  }, []);

  function search(value: string) {
    getRemoteData(`/users/search?query=${value}`).then((data) => {
      setUsers(data);
    });
    getRemoteData(`/posts/search?query=${value}`).then((data) => {
      setPosts(data);
    });
  }

  function handleInputChange(value: string) {
    setInputValue(value);
    if (value.trim().length >= 3) {
      search(value);
    } else {
      setUsers(null);
      setPosts(null);
    }
  }

  let mixed: Array<
    { type: "user"; data: UserPublic } | { type: "post"; data: PostData }
  > = [];
  if (inputValue.trim().length >= 3) {
    if (users && posts) {
      mixed = shuffleArray([
        ...users.map((u) => ({ type: "user", data: u } as const)),
        ...posts.map((p) => ({ type: "post", data: p } as const)),
      ]);
    }
  } else {
    mixed = shuffleArray([
      ...randomUsers.map((u) => ({ type: "user", data: u } as const)),
      ...randomPosts.map((p) => ({ type: "post", data: p } as const)),
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Octicons name="search" size={24} color="#808080" />
        <TextInput
          value={inputValue}
          onChangeText={handleInputChange}
          style={{ outlineColor: "none", outline: "none" }}
        />
      </View>
      <View style={styles.body}>
        <View style={styles.filters}>{dropdowns}</View>
        <ScrollView
          contentContainerStyle={styles.resultsContainer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{ flex: 1, height: "100%" }}
        >
          {mixed.length > 0 ? (
            mixed.map((item, index) => {
              if (item.type === "user") {
                return (
                  <UserWithButton
                    key={index}
                    userId={item.data.id}
                    description={item.data.description}
                  />
                );
              }
              return (
                <Post key={`post-${item.data.id}`} postId={item.data.id} />
              );
            })
          ) : (
            <View style={{ padding: 16 }}>
              <Text style={{ color: "#7b7b7b" }}>Нічого не знайдено</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  resultsContainer: {
    gap: 8,
    flexGrow: 1,
  },
  body: {
    flex: 1,
    gap: 16,
  },
});
