import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { useRouter, Stack } from "expo-router";
import { Post } from "@/components/Post";
import { Posts, UsersPublic } from "@/constants/data";
import { getRemoteData } from "@/utils/api";
import { PostData, UserData, UserPublicFull } from "@/constants/types";
import getUserAvatar from "@/constants/user";

export default function ProfileScreen() {
  const { userId } = useLocalSearchParams();
  const router = useRouter();
  const [user, setUser] = React.useState<UserPublicFull | null>(null);
  const [posts, setPosts] = React.useState<PostData[]>([]);
  const [avatar, setAvatar] = React.useState<any>(null);

  useEffect(() => {
    getRemoteData(`/users/${userId}`).then((data) => {
      setUser(data);
      console.log("User data:", data);
    });
  });

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
            {user?.description && (
              <View style={styles.biographyContainer}>
                <Text style={styles.biographyText}>{user?.description}</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.divider} />
        <FlatList
          style={styles.postsContainer}
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.postWrapper}>
              <Post
                post={item}
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
    </>
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
  },
  postWrapper: {
    marginBottom: 16,
  },
});
