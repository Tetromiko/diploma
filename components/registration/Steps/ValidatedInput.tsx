import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface ValidatedInputProps {
  placeholder: string;
  keyboardType?: "default" | "email-address" | "numeric";
  secureTextEntry?: boolean;
  validate: (value: string) => { isValid: boolean; message?: string };
  onValueChange?: (value: string, isValid: boolean) => void;
  value?: string;
  setValue?: (v: string) => void;
  onSubmitEditing?: () => void;
}

export default function ValidatedInput(props: ValidatedInputProps) {
  const isControlled =
    props.value !== undefined && props.setValue !== undefined;
  const [internalValue, setInternalValue] = useState("");
  const [touched, setTouched] = useState(false);

  const value = isControlled ? props.value! : internalValue;
  const setValue = isControlled ? props.setValue! : setInternalValue;

  const validation = props.validate(value);

  function handleChange(text: string) {
    setValue(text);
    if (props.onValueChange)
      props.onValueChange(text, props.validate(text).isValid);
  }

  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.inputField, { outlineColor: "none", outline: "none" }]}
          placeholder={props.placeholder}
          placeholderTextColor={"#999999"}
          value={value}
          onChangeText={handleChange}
          onBlur={() => setTouched(true)}
          keyboardType={props.keyboardType || "default"}
          secureTextEntry={props.secureTextEntry}
          onSubmitEditing={props.onSubmitEditing}
        />
      </View>
      {touched && !validation.isValid && validation.message && (
        <View style={styles.messageContainer}>
          <MaterialIcons name="error" size={20} color="#f37070" />
          <Text style={styles.messageText}>{validation.message}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  messageText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#999999",
  },
});
