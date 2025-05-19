import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface ValidatedInputProps {
  placeholder: string;
  keyboardType?: "default" | "email-address" | "numeric";
  secureTextEntry?: boolean;
  validate: (
    value: string
  ) =>
    | { isValid: boolean; message?: string }
    | Promise<{ isValid: boolean; message?: string }>;
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
  const [validation, setValidation] = useState<{
    isValid: boolean;
    message?: string;
  }>({ isValid: true });
  const [loading, setLoading] = useState(false);
  const validateId = useRef(0);

  const value = isControlled ? props.value! : internalValue;
  const setValue = isControlled ? props.setValue! : setInternalValue;

  useEffect(() => {
    let cancelled = false;
    const currentId = ++validateId.current;
    const result = props.validate(value);
    if (result instanceof Promise) {
      setLoading(true);
      result.then((res) => {
        if (!cancelled && validateId.current === currentId) {
          setValidation(res);
          setLoading(false);
          if (props.onValueChange) props.onValueChange(value, res.isValid);
        }
      });
    } else {
      setValidation(result);
      setLoading(false);
      if (props.onValueChange) props.onValueChange(value, result.isValid);
    }
    return () => {
      cancelled = true;
    };
  }, [value, props.validate]);

  function handleChange(text: string) {
    setValue(text);
    setTouched(false);
  }

  function handleBlur() {
    setTouched(true);
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
          onBlur={handleBlur}
          keyboardType={props.keyboardType || "default"}
          secureTextEntry={props.secureTextEntry}
          onSubmitEditing={props.onSubmitEditing}
        />
        {loading && (
          <ActivityIndicator
            size="small"
            color="#7eaaed"
            style={{ position: "absolute", right: 16 }}
          />
        )}
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
