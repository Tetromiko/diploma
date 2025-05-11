import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import ValidatedInput from "./ValidatedInput";
import RegistrationStep, { StepValidationProps } from "../RegistrationStep";
import { router } from "expo-router";

export default function EmailAndPasswordStep(props: StepValidationProps) {
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);

  function checkPassword(value: string) {
    const isLengthValid = value.length >= 8;
    const isUpperCaseValid = /[A-Z]/.test(value);
    const isLowerCaseValid = /[a-z]/.test(value);
    const isNumberValid = /\d/.test(value);
    const isSpecialCharacterValid = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const isLatinValid = /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/.test(value); // Перевірка на латинські символи
    if (!isLatinValid) {
      return {
        isValid: false,
        message: "Пароль має містити лише латинські символи",
      };
    }
    if (!isLengthValid) {
      return { isValid: false, message: "Пароль має містити 8+ символів" };
    }
    if (!isUpperCaseValid) {
      return { isValid: false, message: "Пароль має містити велику літеру" };
    }
    if (!isLowerCaseValid) {
      return { isValid: false, message: "Пароль має містити малу літеру" };
    }
    if (!isNumberValid) {
      return { isValid: false, message: "Пароль має містити цифру" };
    }
    if (!isSpecialCharacterValid) {
      return { isValid: false, message: "Пароль має містити спецсимвол" };
    }
    return { isValid: true };
  }

  function checkConfirmPassword(value: string, password: string) {
    if (value !== password) {
      return { isValid: false, message: "Паролі не співпадають" };
    }
    return { isValid: true };
  }

  function checkEmail(value: string) {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!isEmailValid) {
      return { isValid: false, message: "Введіть коректну електронну пошту" };
    }
    return { isValid: true };
  }

  useEffect(() => {
    setEmailValid(
      !!props.registrationData.email &&
        checkEmail(props.registrationData.email).isValid
    );
    setPasswordValid(
      !!props.registrationData.password &&
        checkPassword(props.registrationData.password).isValid
    );
    setConfirmPasswordValid(
      !!props.registrationData.confirmPassword &&
        checkConfirmPassword(
          props.registrationData.confirmPassword,
          props.registrationData.password
        ).isValid
    );
  }, [
    props.registrationData.email,
    props.registrationData.password,
    props.registrationData.confirmPassword,
  ]);

  useEffect(() => {
    if (props.onStepValidChange) {
      props.onStepValidChange(
        emailValid && passwordValid && confirmPasswordValid
      );
    }
  }, [
    emailValid,
    passwordValid,
    confirmPasswordValid,
    props.onStepValidChange,
  ]);

  return (
    <RegistrationStep
      image={require("../../../assets/images/login.png")}
      title={"Введіть електронну пошту та пароль"}
      isStepValid={emailValid && passwordValid && confirmPasswordValid}
    >
      <View style={styles.inputFields}>
        <ValidatedInput
          placeholder="Введіть електронну пошту"
          keyboardType="email-address"
          validate={checkEmail}
          value={props.registrationData.email}
          setValue={(v) => props.updateRegistrationData("email", v)}
          onValueChange={(_, isValid) => setEmailValid(isValid)}
        />
        <ValidatedInput
          placeholder="Введіть пароль"
          secureTextEntry={true}
          value={props.registrationData.password}
          setValue={(v) => props.updateRegistrationData("password", v)}
          validate={checkPassword}
          onValueChange={(_, isValid) => setPasswordValid(isValid)}
        />
        <ValidatedInput
          placeholder="Підтвердіть пароль"
          secureTextEntry={true}
          validate={(value) =>
            checkConfirmPassword(value, props.registrationData.password)
          }
          value={props.registrationData.confirmPassword}
          setValue={(v) => props.updateRegistrationData("confirmPassword", v)}
          onValueChange={(_, isValid) => setConfirmPasswordValid(isValid)}
        />
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Уже є акаунт? </Text>
          <TouchableOpacity onPress={() => router.push("/authorization/login")}>
            <Text style={styles.registerLink}>Увійти</Text>
          </TouchableOpacity>
        </View>
      </View>
    </RegistrationStep>
  );
}

const styles = StyleSheet.create({
  inputFields: {
    gap: 12,
  },
  loginLinkContainer: {
    marginTop: 12,
    alignItems: "center",
  },
  loginLinkText: {
    color: "#7eaaed",
    fontSize: 15,
    textDecorationLine: "underline",
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
