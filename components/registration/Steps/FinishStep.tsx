import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import RegistrationStep, { StepValidationProps } from "../RegistrationStep";

export default function FinishStep(props: StepValidationProps) {
  useEffect(() => {
    props.onStepValidChange?.(true);
  }, [props.onStepValidChange]);

  return (
    <RegistrationStep
      image={require("../../../assets/images/main-character-asks.png")}
      title="Реєстрацію завершено!"
      isStepValid={true}
    >
      <View style={styles.inputFields}>
        <Text style={styles.infoText}>
          Вітаємо! Ви успішно зареєструвались. Натисніть "Далі" для входу.
        </Text>
      </View>
    </RegistrationStep>
  );
}

const styles = StyleSheet.create({
  inputFields: {
    gap: 12,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
  },
});
