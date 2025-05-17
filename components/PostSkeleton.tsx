import React from "react";
import { View, StyleSheet } from "react-native";

export const PostSkeleton: React.FC = () => (
  <View style={styles.container}>
    <View style={styles.header}>
      <View style={styles.avatar} />
      <View style={styles.headerText} />
    </View>
    <View style={styles.body}>
      <View style={styles.title} />
      <View style={styles.text} />
      <View style={styles.attachment} />
    </View>
    <View style={styles.footer}>
      <View style={styles.action} />
      <View style={styles.action} />
      <View style={styles.action} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#cecece",
    overflow: "hidden",
    marginBottom: 16,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#eee",
    marginRight: 12,
  },
  headerText: {
    width: 120,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  body: {
    marginBottom: 12,
  },
  title: {
    width: "60%",
    height: 18,
    borderRadius: 8,
    backgroundColor: "#eee",
    marginBottom: 8,
  },
  text: {
    width: "100%",
    height: 14,
    borderRadius: 8,
    backgroundColor: "#eee",
    marginBottom: 8,
  },
  attachment: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    backgroundColor: "#eee",
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "flex-start",
  },
  action: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#eee",
  },
});
