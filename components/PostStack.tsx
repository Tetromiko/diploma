import React, { useState, useCallback, useContext } from "react";
import { View, StyleSheet, Text, PanResponder, Animated } from "react-native";
import { Post } from "./Post";
import { ContextMenuContext } from "@/contexts/ContextMenuContext";

interface PostStackProps {
  posts: any[];
  onRefresh?: () => void;
}

export const PostStack: React.FC<PostStackProps> = ({ posts, onRefresh }) => {
  const [index, setIndex] = useState(0);
  const { showMenu } = useContext(ContextMenuContext);

  const handleSwipe = useCallback(
    (direction: "up" | "down") => {
      if (direction === "up") {
        if (index < posts.length) {
          setIndex((prev) => prev + 1);
        }
      } else if (direction === "down") {
        if (index > 0) {
          setIndex((prev) => prev - 1);
        }
      }
    },
    [index, posts.length, onRefresh]
  );

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) =>
      Math.abs(gestureState.dy) > 20,
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy < -50) {
        handleSwipe("up");
      } else if (gestureState.dy > 50) {
        handleSwipe("down");
      }
    },
  });

  const visiblePosts =
    index >= posts.length ? [] : posts.slice(index, index + 3);

  return (
    <View style={styles.stack} {...panResponder.panHandlers}>
      <View style={styles.cardContainer}>
        {index >= posts.length ? (
          <Animated.View
            style={[styles.card, { top: 0, zIndex: 3, bottom: 0 }]}
          >
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>
                Немає більше постів. Оновіть, щоб побачити нові.
              </Text>
            </View>
          </Animated.View>
        ) : (
          visiblePosts.map((post, i) => (
            <Animated.View
              key={post.id}
              style={[styles.card, { top: i * 8, zIndex: 3 - i }]}
            >
              <Post post={post} />
            </Animated.View>
          ))
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stack: {
    height: "100%",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  cardContainer: {
    width: "100%",
    height: "100%",
  },
  card: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  placeholder: {
    backgroundColor: "#eee",
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});
