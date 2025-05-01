import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import UserWithButton from "@/components/UserWithButton";

export default function BlockedScreen() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const handleSubmit = () => {
    if (!message.trim()) {
      Alert.alert("Помилка", "Будь ласка, опишіть проблему.");
      return;
    }
    Alert.alert("Дякуємо!", "Ваше повідомлення надіслано.");
    setMessage("");
  };
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
        <Text style={styles.headerTitle}>Повідомити про проблему </Text>
        <View style={styles.actionIcon}></View>
      </View>

      <View style={styles.body}>
        <View style={styles.container}>
          <View style={styles.mainContainer}>
            <View style={styles.reportContainer}>
              <Text style={styles.description}>
                Якщо ви помітили помилку в роботі застосунку або хочете
                повідомити про щось важливе — заповніть поле нижче.
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.inputField,
                    { outlineColor: "none", outline: "none" },
                  ]}
                  placeholder="Опишіть проблему якомога детальніше..."
                  placeholderTextColor="#999999"
                  onChangeText={setMessage}
                  value={message}
                />
              </View>
            </View>
            <View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Надіслати</Text>
                </TouchableOpacity>
              </View>
            </View>
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
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#cecece",
  },
  reportContainer: {
    gap: 8,
  },
  description: {
    fontSize: 16,
    color: "#666666",
  },
  inputContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: "#cecece",
    height: 96,
  },
  inputField: {
    color: "#4d4d4d",
    fontSize: 16,
    fontWeight: "400",
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
});
