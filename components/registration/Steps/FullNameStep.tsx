import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import ValidatedInput from "./ValidatedInput";
import RegistrationStep, { StepValidationProps } from "../RegistrationStep";

// перейменовано на FullNameStep
export default function FullNameStep(props: StepValidationProps) {
  const [valid, setValid] = useState(false);

  function checkFullName(value: string) {
    if (!value || value.trim().length < 3) {
      return {
        isValid: false,
        message: "Введіть повне ім'я (мінімум 3 символи)",
      };
    }
    return { isValid: true };
  }

  useEffect(() => {
    setValid(
      !!props.registrationData.fullName &&
        checkFullName(props.registrationData.fullName).isValid
    );
  }, [props.registrationData.fullName]);

  useEffect(() => {
    props.onStepValidChange?.(valid);
  }, [valid, props.onStepValidChange]);

  return (
    <RegistrationStep
      image={require("@/assets/images/registration/name.png")}
      title="Введіть повне ім'я"
      isStepValid={valid}
    >
      <View style={styles.inputFields}>
        <ValidatedInput
          placeholder="Введіть повне ім'я"
          validate={checkFullName}
          value={props.registrationData.fullName}
          setValue={(v) => props.updateRegistrationData("fullName", v)}
          onValueChange={(_, isValid) => setValid(isValid)}
        />
      </View>
    </RegistrationStep>
  );
}

const styles = StyleSheet.create({
  inputFields: {
    gap: 12,
  },
});
