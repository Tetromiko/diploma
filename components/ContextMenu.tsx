import React, { useEffect, useState } from "react";
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  LayoutChangeEvent,
  Dimensions,
} from "react-native";

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onClosed?: () => void;
  menuOptions: ContextMenuItem[];
}
interface ContextMenuItem {
  label: string;
  onPress: () => void;
  style?: object;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  onClose,
  onClosed,
  menuOptions,
}) => {
  const [menuWidth, setMenuWidth] = useState<number | null>(null);

  const handleLayout = (e: LayoutChangeEvent) => {
    setMenuWidth(e.nativeEvent.layout.width);
  };

  const SCREEN_WIDTH = Dimensions.get("window").width;

  useEffect(() => {
    return () => {
      if (onClosed) onClosed();
    };
  }, []);

  return (
    <Pressable style={styles.menuOverlay} onPress={onClose}>
      <View
        onLayout={handleLayout}
        style={[
          styles.contextMenu,
          menuWidth == null
            ? {
                top: y,
                left: x,
                opacity: 0,
                position: "absolute",
              }
            : {
                top: Math.max(y, 8),
                left: Math.max(
                  Math.min(x - menuWidth / 2, SCREEN_WIDTH - menuWidth - 8),
                  8
                ),
                opacity: 1,
                position: "absolute",
              },
        ]}
      >
        {menuOptions.map((option, index) => (
          <React.Fragment key={index}>
            <Pressable
              style={[
                styles.menuOption,
                option.style,
                index < menuOptions.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: "#cecece",
                },
              ]}
              onPress={() => {
                option.onPress();
                onClose();
              }}
            >
              <Text style={[styles.menuOptionText, option.style]}>
                {option.label}
              </Text>
            </Pressable>
          </React.Fragment>
        ))}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  menuOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
  contextMenu: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#cecece",
    elevation: 1,
    zIndex: 101,
    overflow: "hidden",
  },
  menuOption: {
    paddingVertical: 8,
    padding: 16,
    backgroundColor: "#fff",
    borderColor: "#cecece",
  },
  menuOptionText: {
    fontSize: 14,
    color: "#000",
  },
  divider: {
    height: 1,
    backgroundColor: "#cecece",
  },
});
