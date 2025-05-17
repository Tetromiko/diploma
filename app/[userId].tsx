import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { useRouter, Stack } from "expo-router";
import { Post } from "@/components/Post";
import { getRemoteData, patchRemoteData, postRemoteData } from "@/utils/api";
import { PostData, UserData, UserPublicFull } from "@/constants/types";
import getUserAvatar from "@/constants/user";

export default function ProfileScreen() {
  const { userId } = useLocalSearchParams();
  const router = useRouter();
  const [user, setUser] = useState<UserPublicFull | null>(null);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    getRemoteData(`/users/${userId}`).then((data) => {
      setUser(data);
      console.log("User data:", data);
    });
    getRemoteData(`/me/relations?type=following`).then((followings) => {
      const followingIds = followings.map((user: UserData) => user.id);
      getRemoteData(`/me/relations?type=friends`).then((friends) => {
        const friendIds = friends.map((user: UserData) => user.id);
        setIsSubscribed(
          followingIds.includes(Number(userId)) ||
            friendIds.includes(Number(userId))
        );
      });
    });
    getRemoteData<PostData[]>(`/users/${userId}/posts`).then((data) => {
      setPosts(data);
    });
  }, []);

  function toggleSubscriptionState(state: boolean) {
    setIsSubscribed(!state);
    patchRemoteData(`/users/${userId}/follow`, !state);
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.actionIcon}
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.push("/");
              }
            }}
          >
            <Octicons name="chevron-left" size={32} color="#4d4d4d" />
          </TouchableOpacity>

          <View style={styles.profileProps}>
            <Text style={styles.nickname}>
              {user?.nickname || "Користувач"}
            </Text>
            <TouchableOpacity style={styles.actionIcon}>
              <Ionicons name="ellipsis-vertical" size={32} color="#4d4d4d" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.userInfo}>
          <Image
            source={getUserAvatar(user?.avatarUrl || "")}
            style={styles.profileImage}
          />
          <View style={styles.infoBlock}>
            <Text style={styles.userName}>{user?.fullName || "User"}</Text>
            {user?.description ? (
              <View style={styles.biographyContainer}>
                <Text style={styles.biographyText}>{user?.description}</Text>
              </View>
            ) : null}
          </View>
        </View>
        <View style={styles.buttonHolder}>
          <TouchableOpacity
            onPress={() => toggleSubscriptionState(isSubscribed)}
            style={[
              styles.buttonContainer,
              isSubscribed && styles.buttonInactiveContainer,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                isSubscribed && styles.buttonInactiveText,
              ]}
            >
              {isSubscribed ? "Відписатися" : "Підписатися"}
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.postsContainer}
        >
          {posts?.length > 0 && posts.map((item) => <Post postId={item.id} />)}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    gap: 16,
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
  profileProps: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
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
  divider: {
    height: 1,
    backgroundColor: "#cecece",
    width: "100%",
  },

  postsContainer: {
    flex: 1,
    padding: 16,
    gap: 16,
  },

  scrollView: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: "#cecece",
  },
  buttonHolder: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    backgroundColor: "#7eaaed",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignContent: "center",
    justifyContent: "center",
    height: 32,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  buttonInactiveContainer: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cecece",
  },
  buttonInactiveText: {
    color: "#7b7b7b",
  },
});
