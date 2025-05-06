import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Button,
  Touchable,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function NicknameScreen() {
  const router = useRouter();
  const isNickNameCorrect = true;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.actionIcon}
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="arrow-back" size={32} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Змінити нікнейм</Text>
        <View style={styles.actionIcon}></View>
      </View>
      <View style={styles.body}>
        <View style={styles.mainContainer}>
          <View style={styles.inputValidationContainer}>
            <View style={styles.inputTitleContainer}>
              <MaterialIcons
                name={"drive-file-rename-outline"}
                size={24}
                color="#999999"
              />
              <Text style={styles.optionText}>Нікнейм користувача</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.inputField,
                  { outlineColor: "none", outline: "none" },
                ]}
                placeholder="Введіть новий нікнейм"
                placeholderTextColor="#999999"
              />
            </View>
            <View style={styles.messageContainer}>
              <MaterialIcons
                //style={styles.messageIcon}
                name={isNickNameCorrect ? "check-circle" : "error"}
                size={24}
                color={isNickNameCorrect ? "#91b49d" : "#f37070"}
              />
              <Text style={styles.messageText}>
                {isNickNameCorrect
                  ? "Введений нікнейм доступний"
                  : "На жаль, введений нікнейм зайнятий"}
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Text style={styles.buttonText}>Зберегти</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  mainContainer: {
    gap: 16,
    padding: 8,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#cecece",
  },
  inputValidationContainer: {
    gap: 4,
  },
  inputTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  optionText: {
    color: "#4d4d4d",
    fontWeight: "500",
    fontSize: 16,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  messageIcon: {},
  messageText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#999999",
  },
  button: {
    backgroundColor: "#7eaaed",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#ffffff",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  inputContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: "#cecece",
  },
  inputField: {
    color: "#4d4d4d",
    fontSize: 16,
    fontWeight: "400",
  },
});
