import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { Post } from "@/components/Post";
import {
  Posts,
  UsersPublic,
  MyPosts,
  LikedPosts,
  SavedPosts,
} from "@/constants/data";
import { CURRENT_USER_ID } from "@/constants/user";
import { InteractionManager } from "react-native";
import { useRouter } from "expo-router";

// Формуємо категорії для профілю
const categories = [
  { tab: "пости", icon: "three-bars" },
  { tab: "вподобані", icon: "heart" },
  { tab: "збережені", icon: "bookmark" },
];

export default function ProfileScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState(categories[0].tab);
  const [scrollOffsets, setScrollOffsets] = React.useState<{
    [key: string]: number;
  }>({});
  const flatListRef = React.useRef<FlatList>(null);

  React.useEffect(() => {
    const offset = scrollOffsets[activeTab] || 0;

    const runScroll = () => {
      flatListRef.current?.scrollToOffset({ offset, animated: false });
    };

    InteractionManager.runAfterInteractions(() => {
      requestAnimationFrame(runScroll);
    });
  }, [activeTab]);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset?.y || 0;
    setScrollOffsets((prev) => ({
      ...prev,
      [activeTab]: offsetY,
    }));
  };

  const currentUser = UsersPublic.find((u) => u.id === CURRENT_USER_ID);

  // Вибірка постів для кожної категорії
  let filteredPosts = [];
  if (activeTab === "пости") {
    filteredPosts = MyPosts;
  } else if (activeTab === "вподобані") {
    filteredPosts = LikedPosts;
  } else if (activeTab === "збережені") {
    filteredPosts = SavedPosts;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.nickname}>Нікнейм</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionIcon}>
            <AntDesign name="pluscircleo" size={32} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionIcon}
            onPress={() => router.push("/profile/settings")}
          >
            <Octicons name="gear" size={32} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.userInfo}>
        <Image
          source={{ uri: currentUser?.avatar || "" }}
          style={styles.profileImage}
        />
        <View style={styles.infoBlock}>
          <Text style={styles.userName}>{currentUser?.nickname || "User"}</Text>
          <View style={styles.relations}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>120</Text>
              <Text style={styles.statLabel}>Друзі</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>80</Text>
              <Text style={styles.statLabel}>Підписки</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>150</Text>
              <Text style={styles.statLabel}>Підписники</Text>
            </View>
          </View>
          <View style={styles.biographyContainer}>
            <Text style={styles.biographyText}>
              Розробник ПЗ, музикант, художник та поціновувач кави
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.tabsContainer}>
        {categories.map((tab) => (
          <Pressable
            key={tab.tab}
            style={styles.tab}
            onPress={() => setActiveTab(tab.tab)}
          >
            <Octicons
              name={tab.icon}
              size={24}
              color={activeTab === tab.tab ? "#313131" : "#949494"}
            />
          </Pressable>
        ))}
      </View>
      <FlatList
        ref={flatListRef}
        style={styles.postsContainer}
        data={filteredPosts}
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
        onScroll={handleScroll}
        scrollEventThrottle={16}
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
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 8,
    height: 64,
    borderBottomWidth: 1,
    borderBottomColor: "#cecece",
  },

  actionIcon: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  nickname: {
    fontSize: 18,
    fontWeight: "500",
    padding: 8,
  },
  actions: {
    flexDirection: "row",
  },
  userInfo: {
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
    gap: 8,
  },
  profileImage: {
    width: 72,
    height: 72,
    borderRadius: 48,
  },
  infoBlock: {
    flexDirection: "column",
    alignItems: "center",
    width: 256,
    gap: 8,
  },
  userName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#313131",
  },
  relations: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    width: 80,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 16,
    fontWeight: "500",
    color: "#313131",
  },
  statLabel: {
    fontSize: 12,
    color: "#7b7b7b",
  },
  biographyContainer: {
    padding: 8,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#cecece",
    width: "100%",
  },
  biographyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#313131",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#cecece",
    borderTopWidth: 1,
    borderTopColor: "#cecece",
  },
  tab: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  postsContainer: {
    flex: 1,
    padding: 16,
  },
  postWrapper: {
    marginBottom: 16,
  },
});
