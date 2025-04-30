import React from "react";
import { StyleSheet, View } from "react-native";

interface HeaderProps {
  children?: React.ReactNode;
  style?: object;
}

export const Header: React.FC<HeaderProps> = ({ children, style }) => {
  return <View style={[styles.header, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
  },
});
