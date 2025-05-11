import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { Post } from "@/components/Post";
import { getRemoteData, postRemoteData } from "@/utils/api";
import { useFocusEffect } from "@react-navigation/native";
import getUserAvatar from "@/constants/user";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { UserPublic } from "../home";
import { PostData } from "@/constants/types";
import { router } from "expo-router";

const categories = [
  { key: "created", icon: "three-bars", label: "Створені" },
  { key: "liked", icon: "heart", label: "Вподобані" },
  { key: "saved", icon: "bookmark", label: "Збережені" },
];

export default function ProfileScreen() {
  const [userData, setUserData] = useState<UserPublic | null>(null);
  const [createdPosts, setCreatedPosts] = useState<PostData[]>([]);
  const [likedPosts, setLikedPosts] = useState<PostData[]>([]);
  const [savedPosts, setSavedPosts] = useState<PostData[]>([]);
  const [friendsCount, setFriendsCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [index, setIndex] = useState(0);
  const [routes] = useState(categories);

  useFocusEffect(
    React.useCallback(() => {
      getRemoteData("/me").then((data) => setUserData(data));
      getRemoteData("/me/interactions?type=create").then(setCreatedPosts);
      getRemoteData("/me/interactions?type=like").then(setLikedPosts);
      getRemoteData("/me/interactions?type=save").then(setSavedPosts);
      getRemoteData("/me/relations?type=friends").then((data) => {
        setFriendsCount(data.length);
      });
      getRemoteData("/me/relations?type=following").then((data) => {
        setFollowingCount(data.length);
      });
      getRemoteData("/me/relations?type=followers").then((data) => {
        setFollowersCount(data.length);
      });
    }, [])
  );

  const renderScene = SceneMap({
    created: () => <TabPostsList posts={createdPosts} />,
    liked: () => <TabPostsList posts={likedPosts} />,
    saved: () => <TabPostsList posts={savedPosts} />,
  });

  function TabPostsList({ posts }: { posts: PostData[] }) {
    return (
      <View style={styles.postsContainer}>
        {posts.length === 0 ? (
          <View style={styles.empty}>
            <Text style={{ color: "#7b7b7b" }}>Постів немає</Text>
          </View>
        ) : (
          posts.map((item) => (
            <View style={styles.postWrapper} key={item.id}>
              <Post post={item} />
            </View>
          ))
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.nickname}>{userData?.nickname || "nickname"}</Text>
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
          source={getUserAvatar(userData?.avatarUrl || "")}
          resizeMode="cover"
          style={styles.profileImage}
        />
        <View style={styles.infoBlock}>
          <Text style={styles.userName}>{userData?.fullName || "User"}</Text>
          <View style={styles.relations}>
            <TouchableOpacity
              style={styles.statItem}
              onPress={() => {
                router.push("/profile/friends");
              }}
            >
              <Text style={styles.statNumber}>{friendsCount}</Text>
              <Text style={styles.statLabel}>Друзі</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.statItem}
              onPress={() => {
                router.push("/profile/following");
              }}
            >
              <Text style={styles.statNumber}>{followingCount}</Text>
              <Text style={styles.statLabel}>Підписки</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.statItem}
              onPress={() => {
                router.push("/profile/followers");
              }}
            >
              <Text style={styles.statNumber}>{followersCount}</Text>
              <Text style={styles.statLabel}>Підписники</Text>
            </TouchableOpacity>
          </View>
          {userData?.description && (
            <View style={styles.biographyContainer}>
              <Text style={styles.biographyText}>{userData?.description}</Text>
            </View>
          )}
        </View>
      </View>
      <TabView
        commonOptions={{
          icon: ({ route, focused }) => (
            <Octicons
              name={route.icon}
              size={24}
              color={focused ? "#000000" : "#808080"}
            />
          ),
        }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ height: 0 }}
            style={{
              backgroundColor: "transparent",
              shadowColor: "transparent",
              borderBottomWidth: 1,
              borderBottomColor: "#cecece",
              borderTopWidth: 1,
              borderTopColor: "#cecece",
            }}
          />
        )}
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
  postsContainer: {
    flex: 1,
    padding: 16,
  },
  postWrapper: {
    marginBottom: 16,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
});
