import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { getRemoteData, postRemoteData } from "@/utils/api";
import { saveData } from "@/utils/storage";

export default function LoginScreen() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function loginRequest() {
    postRemoteData("/authorization/login", {
      login: login,
      password: password,
    }).then((response) => {
      if (response.token) {
        saveData("token", response.token);
        router.replace("/home");
      } else {
        console.error("Registration failed:", response);
      }
    });
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "space-around" }}>
        <View style={{ gap: 28 }}>
          <Text style={styles.appTitle}>Delagram</Text>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/images/login.png")}
              style={styles.image}
            />
          </View>
        </View>
        <View>
          <Text style={styles.title}>УВІЙТИ В АКАУНТ</Text>
        </View>
        <View style={styles.loginContainer}>
          <View style={styles.inputFields}>
            <View style={styles.inputContainer}>
              <TextInput
                style={
                  (styles.inputField,
                  {
                    outlineColor: "none",
                    outline: "none",
                  })
                }
                placeholder="Нікнейм або e-mail"
                placeholderTextColor="#999999"
                value={login}
                onChangeText={setLogin}
                keyboardType="default"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={
                  (styles.inputField,
                  {
                    outlineColor: "none",
                    outline: "none",
                  })
                }
                placeholder="Пароль"
                placeholderTextColor="#999999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Забули пароль?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.loginButtonContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={loginRequest}>
              <Text style={styles.loginButtonText}>Увійти</Text>
            </TouchableOpacity>
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Немає акаунту? </Text>
              <TouchableOpacity
                onPress={() => router.replace("/authorization/register")}
              >
                <Text style={styles.registerLink}>Зареєструватися</Text>
              </TouchableOpacity>
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
    backgroundColor: "#ffffff",
    padding: 16,
    justifyContent: "center",
  },
  appTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3b73b1",
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: 360,
    height: 360,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: "#3b73b1",
    textAlign: "center",
  },
  loginContainer: {
    paddingHorizontal: 16,
    gap: 48,
  },
  inputFields: {
    gap: 12,
  },
  inputContainer: {
    height: 48,
    backgroundColor: "#ffffff",
    borderRadius: 24,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#cecece",
    justifyContent: "center",
  },
  inputField: {
    color: "#4d4d4d",
    fontSize: 16,
    fontWeight: "400",
  },
  forgotPassword: {
    fontSize: 14,
    color: "#7eaaed",
    textAlign: "right",
  },
  loginButtonContainer: {
    gap: 16,
  },
  loginButton: {
    backgroundColor: "#7eaaed",
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  registerText: {
    fontSize: 14,
    color: "#999999",
  },
  registerLink: {
    fontSize: 14,
    color: "#7eaaed",
    fontWeight: "500",
  },
});
