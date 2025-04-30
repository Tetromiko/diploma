import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Octicons } from "@expo/vector-icons";

interface IconWithBadgeProps {
  name: string;
  size?: number;
  color?: string;
  active?: boolean;
  badgeColor?: string;
}

export const IconWithBadge: React.FC<IconWithBadgeProps> = ({
  name,
  size = 24,
  color = "black",
  active = false,
  badgeColor = "red",
}) => {
  return (
    <View style={styles.iconContainer}>
      <Octicons name={name} size={size} color={color} />
      {active && (
        <View style={[styles.badge, { backgroundColor: badgeColor }]}></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    right: -6,
    top: -2,
    backgroundColor: "#7eaaed",
    borderRadius: 8,
    height: 12,
    minWidth: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});
