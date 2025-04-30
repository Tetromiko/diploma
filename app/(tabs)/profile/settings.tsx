import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const setting = [
  {
    category: "Редагування акаунту",
    options: [
      {
        icon: "drive-file-rename-outline",
        label: "Змінити нікнейм",
      },
      {
        icon: "description",
        label: "Змінити опис користувача",
      },
      {
        icon: "private-connectivity",
        label: "Конфіденційність облікового запису",
      },
      {
        icon: "block",
        label: "Заблоковані користувачі",
      },
    ],
  },
  {
    category: "Налаштування додатку",
    options: [
      {
        icon: "style",
        label: "Тема інтерфейсу додатку",
      },
      {
        icon: "language",
        label: "Мова додатку",
      },
    ],
  },
  {
    category: "Додаткова інформація та підтримка",
    options: [
      {
        icon: "report-problem",
        label: "Повідомити про проблему",
      },
      {
        icon: "privacy-tip",
        label: "Центр конфіденційності",
      },
      {
        icon: "info-outline",
        label: "Інформація",
      },
    ],
  },
  {
    category: "Вхід",
    options: [
      {
        icon: "logout",
        label: "Вийти",
      },
    ],
  },
];

export default function SettingsScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.actionIcon}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={32} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Налаштування</Text>
        <View style={styles.actionIcon}></View>
      </View>
      <View style={styles.body}>
        {setting.map((item, index) => (
          <View style={styles.categoryContainer} key={index}>
            <Text style={styles.categoryTitle}>{item.category}</Text>
            <View style={styles.optionsContainer}>
              {item.options &&
                item.options.map((option, idx) => (
                  <TouchableOpacity
                    onPress={() => {
                      alert(`Selected: ${option.label}`);
                    }}
                    key={idx}
                    style={styles.option}
                  >
                    <MaterialIcons
                      name={option.icon}
                      size={24}
                      color="#999999"
                    />
                    <Text style={styles.optionText}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  header: {
    height: 64,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#cecece",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  actionIcon: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
    flex: 1,
    textAlign: "center",
  },
  body: {
    gap: 16,
    padding: 16,
  },
  categoryContainer: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cecece",
    gap: 8,
    //4 8 12 24 32 48 64 72 80 96 128
  },
  categoryTitle: {
    fontSize: 14,
    color: "#666666",
  },
  optionsContainer: {
    gap: 8,
  },
  optionText: {
    color: "#4d4d4d",
    fontWeight: "500",
    fontSize: 16,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
