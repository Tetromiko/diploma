import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";
import { ContextMenuContext } from "@/contexts/ContextMenuContext";
import { Octicons } from "@expo/vector-icons";

export type DropdownOption = {
  label: string;
  onSelect: () => void;
};

interface DropdownProps {
  options: DropdownOption[];
}

export const Dropdown = function Dropdown({ options }: DropdownProps) {
  const [selectedOption, setSelectedOption] = useState(0);
  const { showMenu } = useContext(ContextMenuContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handlePress = (event: any) => {
    const { pageX, pageY } = event.nativeEvent;
    setMenuOpen(true);
    showMenu({
      x: pageX,
      y: pageY + 20,
      menuOptions: options.map((option) => ({
        label: option.label,
        onPress: () => {
          setSelectedOption(options.indexOf(option));
          option.onSelect();
        },
      })),
      onClosed: () => setMenuOpen(false),
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.dropdownContainer}>
      <Text style={styles.text}>{options[selectedOption].label}</Text>
      <Octicons
        name={menuOpen ? "chevron-up" : "chevron-down"}
        size={16}
        color="#808080"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    height: 32,
    paddingHorizontal: 8,
    justifyContent: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#cecece",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  text: {
    fontSize: 16,
    color: "#808080",
    fontWeight: "500",
  },
});
