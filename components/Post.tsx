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
import { getRemoteData } from "@/utils/api";

interface PostProps {
  post: PostData;
  onMenuPress?: (event: any) => void;
  onClose?: () => void;
}

function AttachmentsGrid({ attachments }: { attachments: string[] }) {
  if (!attachments || attachments.length === 0) return null;
  const count = attachments.length;
  if (count === 1) {
    return (
      <View style={styles.attachmentsGridRow}>
        <Image
          source={{ uri: attachments[0] }}
          style={styles.attachmentSingle}
          resizeMode="cover"
        />
      </View>
    );
  }
  if (count === 2) {
    return (
      <View style={styles.attachmentsGridRow}>
        <Image
          source={{ uri: attachments[0] }}
          style={styles.attachmentHalf}
          resizeMode="cover"
        />
        <Image
          source={{ uri: attachments[1] }}
          style={styles.attachmentHalf}
          resizeMode="cover"
        />
      </View>
    );
  }
  if (count === 3) {
    return (
      <View style={styles.attachmentsGridRow}>
        <Image
          source={{ uri: attachments[0] }}
          style={styles.attachmentHalf}
          resizeMode="cover"
        />
        <View
          style={{
            width: 0,
            flexGrow: 1,
            flexShrink: 1,
            flexDirection: "column",
            gap: 4,
          }}
        >
          <Image
            source={{ uri: attachments[1] }}
            style={styles.attachmentQuarter}
            resizeMode="cover"
          />
          <Image
            source={{ uri: attachments[2] }}
            style={styles.attachmentQuarter}
            resizeMode="cover"
          />
        </View>
      </View>
    );
  }
  if (count >= 4) {
    const showCount = Math.min(4, count);
    return (
      <View style={styles.attachmentsGrid}>
        <View style={styles.attachmentsGridRow}>
          <Image
            source={{ uri: attachments[0] }}
            style={styles.attachmentQuarter}
            resizeMode="cover"
          />
          <Image
            source={{ uri: attachments[1] }}
            style={styles.attachmentQuarter}
            resizeMode="cover"
          />
        </View>
        <View style={styles.attachmentsGridRow}>
          <Image
            source={{ uri: attachments[2] }}
            style={styles.attachmentQuarter}
            resizeMode="cover"
          />
          {showCount > 4 ? (
            <View style={styles.attachmentQuarter}>
              <Image
                source={{ uri: attachments[3] }}
                style={[
                  styles.attachmentQuarter,
                  { position: "absolute", top: 0, left: 0 },
                ]}
                resizeMode="cover"
              />
              <View style={styles.overlay}>
                <Text style={styles.overlayText}>+{count - 3}</Text>
              </View>
            </View>
          ) : (
            <Image
              source={{ uri: attachments[3] }}
              style={styles.attachmentQuarter}
              resizeMode="cover"
            />
          )}
        </View>
      </View>
    );
  }
  return null;
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

  useEffect(() => {
    getRemoteData(`/posts/${post.id}/interactions`).then((data) => {
      setLiked(data.includes("like"));
      setDisliked(data.includes("dislike"));
      setSaved(data.includes("save"));
    });
  });

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
      <View style={styles.body}>
        <ScrollView
          contentContainerStyle={styles.postBody}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => console.log("Post pressed")}
            onLongPress={() => {
              console.log("Long press detected");
            }}
            delayLongPress={300}
            style={{ flex: 1 }}
          >
            <View>
              <View style={styles.titleContainer}>
                <View style={styles.verticalLine} />
                <Text style={styles.title}>{post?.title || "Title"}</Text>
              </View>
              <Text style={styles.text}>{post?.text || "Text"}</Text>
              {post.attachments && post.attachments.length > 0 && (
                <AttachmentsGrid attachments={post.attachments} />
              )}
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
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
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#4d4d4d",
  },
  text: {
    fontSize: 14,
    color: "#4d4d4d",
    marginBottom: 8,
  },
  attachments: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
  },
  attachmentImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  verticalLine: {
    width: 1.5,
    height: 40,
    backgroundColor: "#999999",
  },
  postBody: {
    gap: 8,
    flexGrow: 1,
  },
  attachmentsGrid: {
    flexDirection: "column",
    gap: 4,
    marginTop: 4,
  },
  attachmentsGridRow: {
    flexDirection: "row",
    gap: 4,
  },
  attachmentSingle: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  attachmentHalf: {
    flex: 1,
    width: "0%",
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  attachmentQuarter: {
    flex: 1,
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: "#eee",
    overflow: "hidden",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  overlayText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
