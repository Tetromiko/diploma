import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import ValidatedInput from "./ValidatedInput";
import RegistrationStep, { StepValidationProps } from "../RegistrationStep";

export default function AgeStep(props: StepValidationProps) {
  const [valid, setValid] = useState(false);

  function checkAge(value: string) {
    const num = Number(value);
    if (!value || isNaN(num)) {
      return { isValid: false, message: "Введіть ваш вік" };
    }
    if (num < 13) {
      return { isValid: false, message: "Вік має бути не менше 13 років" };
    }
    return { isValid: true };
  }

  useEffect(() => {
    setValid(
      !!props.registrationData.age &&
        checkAge(props.registrationData.age).isValid
    );
  }, [props.registrationData.age]);

  useEffect(() => {
    props.onStepValidChange?.(valid);
  }, [valid, props.onStepValidChange]);

  return (
    <RegistrationStep
      image={require("@/assets/images/registration/age.png")}
      title="Вкажіть ваш вік"
      isStepValid={valid}
    >
      <View style={styles.inputFields}>
        <ValidatedInput
          placeholder="Введіть ваш вік"
          keyboardType="numeric"
          validate={checkAge}
          value={props.registrationData.age}
          setValue={(v) => props.updateRegistrationData("age", v)}
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
