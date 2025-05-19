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
import { deleteRemoteData, getRemoteData, postRemoteData } from "@/utils/api";
import { PostSkeleton } from "./PostSkeleton";
import { getData } from "@/utils/storage";

interface PostProps {
  postId: number;
  fixedSize?: boolean;
  onClose?: () => void;
  onDelete?: () => void;
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
                <Text style={styles.overlayText}>+{count - 4}</Text>
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

export const Post: React.FC<PostProps> = ({ postId, fixedSize, onDelete }) => {
  const { showMenu } = useContext(ContextMenuContext);
  const [post, setPost] = useState<PostData | null>(null);
  const [interactions, setInteractions] = useState<string[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [isMine, setIsMine] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const foreignPostMenuOptions = [
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
  ];

  const myPostMenuOptions = [
    {
      label: "Редагувати",
      onPress: () => alert("Редагувати пост"),
    },
    {
      label: "Видалити",
      onPress: async () => {
        await deleteRemoteData(`/posts/${postId}`);
        console.log("Post deleted");
        onDelete?.();
      },
    },
  ];

  useEffect(() => {
    if (!postId) return;
    setIsLoading(true);
    getRemoteData<PostData>(`/posts/${postId}`)
      .then((data) => {
        setPost(data);
        setInteractions(data.interactions || []);
        setInitialized(true);
        getData<string>("token").then((token) => {
          if (!token) {
            setIsMine(false);
            return;
          }
          const payload = JSON.parse(atob(token.split(".")[1]));
          const userId = payload.nameid;
          setIsMine(data.creator?.id == userId);
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [postId]);

  useEffect(() => {
    if (!initialized) return;
    if (interactions === (post?.interactions || [])) return;
    postRemoteData(`/posts/${postId}/interactions`, interactions);
  }, [interactions, initialized, post]);

  function handleSaved() {
    setInteractions((prev) =>
      prev.includes("save")
        ? prev.filter((i) => i !== "save")
        : [...prev, "save"]
    );
  }

  function handleLike() {
    setInteractions((prev) => {
      const newInteractions = prev.includes("like")
        ? prev.filter((i) => i !== "like")
        : [...prev, "like"];
      if (newInteractions.includes("dislike")) {
        return newInteractions.filter((i) => i !== "dislike");
      }
      return newInteractions;
    });
  }

  function handleDislike() {
    setInteractions((prev) => {
      const newInteractions = prev.includes("dislike")
        ? prev.filter((i) => i !== "dislike")
        : [...prev, "dislike"];
      if (newInteractions.includes("like")) {
        return newInteractions.filter((i) => i !== "like");
      }
      return newInteractions;
    });
  }

  if (isLoading) {
    return <PostSkeleton />;
  }

  function handleMenuPress(event: any) {
    const { pageX, pageY } = event.nativeEvent || {};

    const options = isMine ? myPostMenuOptions : foreignPostMenuOptions;

    showMenu({
      x: pageX ?? 0,
      y: pageY ?? 0,
      menuOptions: options,
    });
  }

  if (!post) {
    return (
      <View style={styles.container}>
        <Text>Завантаження...</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        fixedSize ? { height: "100%" } : { maxHeight: 648 },
      ]}
    >
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
          contentContainerStyle={[
            styles.postBody,
            fixedSize
              ? { justifyContent: "space-between", height: "100%" }
              : {},
          ]}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View>
            <View style={styles.titleContainer}>
              <View style={styles.verticalLine} />
              <Text style={styles.title}>{post?.title || "Title"}</Text>
            </View>
            {post.text ? <Text style={styles.text}>{post.text}</Text> : null}
          </View>
          {post.attachments && post.attachments.length > 0 && (
            <AttachmentsGrid attachments={post.attachments} />
          )}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.options} onPress={handleLike}>
            <Octicons
              name="thumbsup"
              size={24}
              color={interactions.includes("like") ? "#91b49d" : "#999"}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.options} onPress={handleDislike}>
            <Octicons
              name="thumbsdown"
              size={24}
              color={interactions.includes("dislike") ? "#e57373" : "#999"}
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
            color={interactions.includes("save") ? "#f8c125" : "#999"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#cecece",
    overflow: "hidden",
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
    flex: 1,
    padding: 16,
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
