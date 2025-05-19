import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import ValidatedInput from "./ValidatedInput";
import RegistrationStep, { StepValidationProps } from "../RegistrationStep";
import { postRemoteData } from "@/utils/api";

export default function NicknameStep(props: StepValidationProps) {
  const [nicknameValid, setNicknameValid] = useState(false);

  async function checkNickname(value: string) {
    const isCharactersValid = /^[a-zA-Z0-9_]+$/.test(value);
    const isLengthValid = value.length >= 3 && value.length <= 20;

    if (!isLengthValid) {
      return { isValid: false, message: "Нікнейм має містити 3-20 символів" };
    }
    if (!isCharactersValid) {
      return {
        isValid: false,
        message: "Нікнейм може містити лише латинські літери, цифри та _",
      };
    }

    const data = await postRemoteData(
      "/authorization/validate-registration-variable",
      {
        type: "nickname",
        value: value,
      }
    );

    if (!data.isValid) {
      return { isValid: false, message: "Цей нікнейм вже зайнятий" };
    }
    return { isValid: true };
  }

  React.useEffect(() => {
    if (props.onStepValidChange) {
      props.onStepValidChange(nicknameValid);
    }
  }, [nicknameValid, props.onStepValidChange]);

  return (
    <RegistrationStep
      image={require("@/assets/images/registration/nickname.png")}
      title={"Введіть нікнейм"}
      isStepValid={nicknameValid}
    >
      <View style={styles.inputFields}>
        <ValidatedInput
          placeholder="Введіть нікнейм"
          validate={checkNickname}
          value={props.registrationData.nickname}
          setValue={(v) => props.updateRegistrationData("nickname", v)}
          onValueChange={(_, isValid) => setNicknameValid(isValid)}
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
