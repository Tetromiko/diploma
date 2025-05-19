import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList, Pressable } from "react-native";
import RegistrationStep, { StepValidationProps } from "../RegistrationStep";
import ValidatedInput from "./ValidatedInput";

const COUNTRIES = [
  "",
  "Україна",
  "Польща",
  "Німеччина",
  "США",
  "Канада",
  "Велика Британія",
  "Франція",
  "Італія",
  "Іспанія",
  "Інша країна",
];

export default function CountryStep(props: StepValidationProps) {
  const [valid, setValid] = useState(false);
  const [inputValue, setInputValue] = useState(
    props.registrationData.country || ""
  );
  const [touched, setTouched] = useState(false);

  function checkCountry(value: string) {
    if (!value || value === "") {
      return { isValid: false, message: "Оберіть країну" };
    }
    if (!COUNTRIES.includes(value)) {
      return { isValid: false, message: "Оберіть країну зі списку" };
    }
    return { isValid: true };
  }

  const filteredCountries = React.useMemo(() => {
    if (!inputValue) return COUNTRIES;
    return COUNTRIES.filter((c) =>
      c.toLowerCase().includes(inputValue.trim().toLowerCase())
    );
  }, [inputValue]);

  useEffect(() => {
    setValid(
      !!props.registrationData.country &&
        checkCountry(props.registrationData.country).isValid
    );
  }, [props.registrationData.country]);

  useEffect(() => {
    setInputValue(props.registrationData.country || "");
    if (COUNTRIES.includes(props.registrationData.country || "")) {
      setTouched(false);
    }
  }, [props.registrationData.country]);

  useEffect(() => {
    props.onStepValidChange?.(valid);
  }, [valid, props.onStepValidChange]);

  const showDropdown =
    touched &&
    filteredCountries.length > 0 &&
    inputValue.length > 0 &&
    !COUNTRIES.includes(inputValue);

  return (
    <RegistrationStep
      image={require("@/assets/images/registration/country.png")}
      title="Оберіть країну проживання"
      isStepValid={valid}
    >
      <View style={styles.inputFields}>
        <ValidatedInput
          placeholder="Країна"
          validate={checkCountry}
          value={inputValue}
          setValue={(v) => {
            setInputValue(v);
            props.updateRegistrationData("country", v);
            setTouched(true);
          }}
          onValueChange={() => setTouched(true)}
          onSubmitEditing={() => {
            const isValid = checkCountry(inputValue).isValid;
            setValid(isValid);
            setTouched(false);
            if (isValid) {
              props.updateRegistrationData("country", inputValue);
            }
          }}
        />
        {showDropdown && (
          <View style={styles.dropdown}>
            <FlatList
              data={filteredCountries}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.dropdownItem}
                  onPress={() => {
                    props.updateRegistrationData("country", item);
                    setInputValue(item);
                    setTouched(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{item}</Text>
                </Pressable>
              )}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        )}
      </View>
    </RegistrationStep>
  );
}

const styles = StyleSheet.create({
  inputFields: {
    gap: 12,
    zIndex: 2,
  },
  dropdown: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#cecece",
    borderRadius: 8,
    maxHeight: 160,
    marginTop: 2,
    zIndex: 10,
    position: "absolute",
    width: "100%",
    top: 52,
    left: 0,
    right: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#222",
  },
  errorText: {
    color: "#f37070",
    fontSize: 14,
    marginTop: 4,
  },
});
