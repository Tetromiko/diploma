import { Octicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LikedPostIds, SavedPostIds } from "@/constants/data";

interface PostProps {
  post: any;
  onMenuPress?: (event: any) => void;
}

export const Post: React.FC<PostProps> = ({ post, onMenuPress }) => {
  const [liked, setLiked] = useState(LikedPostIds.includes(post.id));
  const [disliked, setDisliked] = useState(false);
  const [saved, setSaved] = useState(SavedPostIds.includes(post.id));

  useEffect(() => {
    setLiked(LikedPostIds.includes(post.id));
  }, [post.id]);
  useEffect(() => {
    setSaved(SavedPostIds.includes(post.id));
  }, [post.id]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <TouchableOpacity onPress={() => console.log("Avatar pressed")}>
            <Image source={{ uri: post.avatar }} style={styles.avatar} />
          </TouchableOpacity>
          <Text style={styles.nickname}>{post.nickname || "Nickname"}</Text>
        </View>
        <TouchableOpacity style={styles.options} onPress={onMenuPress}>
          <Octicons name="kebab-horizontal" size={24} color="#999" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.body}
        onPress={() => console.log("Post pressed")}
        onLongPress={() => {
          console.log("Long press detected");
        }}
        delayLongPress={300}
      >
        <View></View>
      </TouchableOpacity>
      <View style={styles.footer}>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.options}
            onPress={() => {
              setLiked((prev) => !prev);
              if (disliked) setDisliked(false);
            }}
          >
            <Octicons
              name="thumbsup"
              size={24}
              color={liked ? "#91b49d" : "#999"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.options}
            onPress={() => {
              setDisliked((prev) => !prev);
              if (liked) setLiked(false);
            }}
          >
            <Octicons
              name="thumbsdown"
              size={24}
              color={disliked ? "#e57373" : "#999"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.options}
            onPress={() => console.log("Direct message pressed")}
          >
            <Octicons name="comment" size={24} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.options}
            onPress={() => console.log("Discussions pressed")}
          >
            <Octicons name="comment-discussion" size={24} color="#999" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.options}
          onPress={() => setSaved((prev) => !prev)}
        >
          <Octicons
            name="bookmark"
            size={24}
            color={saved ? "#f8c125" : "#999"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#cecece",
    overflow: "hidden",
    display: "flex",
    zIndex: 3,
  },
  header: {
    height: 64,
    borderBottomWidth: 1,
    borderBottomColor: "#cecece",
    flexDirection: "row",
    padding: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  body: {
    minHeight: 200,
    flex: 1,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#cecece",
    height: 64,
    alignItems: "center",
    flexDirection: "row",
    padding: 8,
    justifyContent: "space-between",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
  },
  nickname: {
    fontSize: 16,
    fontWeight: "500",
  },
  options: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  actions: {
    flexDirection: "row",
  },
});
