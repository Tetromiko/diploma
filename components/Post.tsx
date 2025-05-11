import { Octicons } from "@expo/vector-icons";
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { PostData } from "@/constants/types";
import getUserAvatar from "@/constants/user";
import { router } from "expo-router";
import { ContextMenuContext } from "@/contexts/ContextMenuContext";

interface PostProps {
  post: PostData;
  onMenuPress?: (event: any) => void;
  onClose?: () => void;
}

export const Post: React.FC<PostProps> = ({ post, onMenuPress }) => {
  const { showMenu } = useContext(ContextMenuContext);
  const [liked, setLiked] = useState(post.interactions.includes("like"));
  const [disliked, setDisliked] = useState(
    post.interactions.includes("dislike")
  );
  const [saved, setSaved] = useState(post.interactions.includes("save"));

  function handleDislike() {
    if (liked) {
      setLiked(false);
    }
    setDisliked(!disliked);
  }

  function handleLike() {
    if (disliked) {
      setDisliked(false);
    }
    setLiked(!liked);
  }

  function handleSaved() {
    setSaved(!saved);
  }

  function handleMenuPress(event: any) {
    const { pageX, pageY } = event.nativeEvent || {};
    showMenu({
      x: pageX ?? 0,
      y: pageY ?? 0,
      menuOptions: [
        {
          label: "Поскаржитись",
          onPress: () => alert("Поскаржитись"),
        },
        {
          label: "Чому я це бачу?",
          onPress: () => alert("Чому я це бачу?"),
        },
        {
          label: "Нецікаво",
          onPress: () => alert("Нецікаво"),
        },
      ],
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <TouchableOpacity onPress={() => router.push(`/${post.creator.id}`)}>
            <Image
              source={getUserAvatar(post?.creator?.avatarUrl || "")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <Text style={styles.nickname}>
            {post?.creator?.fullName || "Full Name"}
          </Text>
        </View>
        <TouchableOpacity style={styles.options} onPress={handleMenuPress}>
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
        <ScrollView>
          <Text style={styles.title}>{post?.title || "Title"}</Text>
          <Text style={styles.text}>{post?.text || "Text"}</Text>
          {post.attachments && post.attachments.length > 0 && (
            <View style={styles.attachments}>
              {post.attachments.map((uri, idx) => (
                <Image
                  key={idx}
                  source={{ uri }}
                  style={styles.attachmentImage}
                  resizeMode="cover"
                />
              ))}
            </View>
          )}
        </ScrollView>
      </TouchableOpacity>
      <View style={styles.footer}>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.options} onPress={handleLike}>
            <Octicons
              name="thumbsup"
              size={24}
              color={liked ? "#91b49d" : "#999"}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.options} onPress={handleDislike}>
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
        <TouchableOpacity style={styles.options} onPress={handleSaved}>
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
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: "#222",
  },
  text: {
    fontSize: 15,
    color: "#333",
    marginBottom: 8,
  },
  attachments: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
  },
  attachmentImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: "#eee",
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
    borderRadius: 24,
    backgroundColor: "#eee",
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
