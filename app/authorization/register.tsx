import EmailAndPasswordStep from "@/components/registration/Steps/EmailAndPasswordStep";
import NicknameStep from "@/components/registration/Steps/NicknameStep";
import FullNameStep from "@/components/registration/Steps/FullNameStep";
import AgeStep from "@/components/registration/Steps/AgeStep";
import CountryStep from "@/components/registration/Steps/CountryStep";
import InterestsStep from "@/components/registration/Steps/InterestsStep";
import AvatarStep from "@/components/registration/Steps/AvatarStep";
import NotInterestedStep from "@/components/registration/Steps/NotInterestedStep";
import TermsStep from "@/components/registration/Steps/TermsStep";
import FinishStep from "@/components/registration/Steps/FinishStep";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { clamp } from "react-native-reanimated";
import { router } from "expo-router";
import { RegistrationFormData, RegistrationRequest } from "@/constants/types";
import { getRemoteData, postRemoteData } from "@/utils/api";
import { saveData } from "@/utils/storage";
import { setCurrentUser } from "@/constants/user";

export default function RegisterScreen() {
  const [step, setStep] = useState(1);
  const nextStep = () =>
    setStep((prev) => clamp(prev + 1, 1, registrationSteps.length));
  const prevStep = () =>
    setStep((prev) => clamp(prev - 1, 1, registrationSteps.length));

  const [stepValid, setStepValid] = useState(false);

  const [registrationData, setRegistrationData] =
    useState<RegistrationFormData>({
      email: "",
      password: "",
      confirmPassword: "",
      nickname: "",
      fullName: "",
      age: "",
      country: "",
      interests: [],
      notInterested: [],
      avatar: "",
    });

  function updateRegistrationData(field: string, value: any) {
    setRegistrationData((prev) => ({ ...prev, [field]: value }));
  }

  const registrationSteps = [
    <EmailAndPasswordStep
      key={1}
      onStepValidChange={setStepValid}
      registrationData={registrationData}
      updateRegistrationData={updateRegistrationData}
    />,
    <NicknameStep
      key={2}
      onStepValidChange={setStepValid}
      registrationData={registrationData}
      updateRegistrationData={updateRegistrationData}
    />,
    <FullNameStep
      key={3}
      onStepValidChange={setStepValid}
      registrationData={registrationData}
      updateRegistrationData={updateRegistrationData}
    />,
    <AgeStep
      key={4}
      onStepValidChange={setStepValid}
      registrationData={registrationData}
      updateRegistrationData={updateRegistrationData}
    />,
    <CountryStep
      key={5}
      onStepValidChange={setStepValid}
      registrationData={registrationData}
      updateRegistrationData={updateRegistrationData}
    />,
    <InterestsStep
      key={6}
      onStepValidChange={setStepValid}
      registrationData={registrationData}
      updateRegistrationData={updateRegistrationData}
    />,
    <NotInterestedStep
      key={7}
      onStepValidChange={setStepValid}
      registrationData={registrationData}
      updateRegistrationData={updateRegistrationData}
    />,
    <AvatarStep
      key={8}
      onStepValidChange={setStepValid}
      registrationData={registrationData}
      updateRegistrationData={updateRegistrationData}
    />,
    <TermsStep
      key={9}
      onStepValidChange={setStepValid}
      registrationData={registrationData}
      updateRegistrationData={updateRegistrationData}
    />,
    <FinishStep
      key={10}
      onStepValidChange={setStepValid}
      registrationData={registrationData}
      updateRegistrationData={updateRegistrationData}
    />,
  ];

  async function submitRegistration() {
    const request: RegistrationRequest = {
      email: registrationData.email,
      password: registrationData.password,
      nickname: registrationData.nickname,
      fullName: registrationData.fullName,
      avatar: registrationData.avatar,
      interests: registrationData.interests,
      notInterested: registrationData.notInterested,
    };

    postRemoteData("/authorization/register", request).then((response) => {
      if (response.token) {
        saveData("token", response.token);
        getRemoteData("/me").then((user) => {
          setCurrentUser(user);
        });
        router.replace("/home");
      } else {
        console.error("Registration failed:", response);
      }
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>РЕЄСТРАЦІЯ</Text>
      </View>
      <View style={styles.body}>{registrationSteps[step - 1]}</View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={prevStep}>
          <Text style={styles.buttonText}>Назад</Text>
        </TouchableOpacity>
        <View style={styles.stepsContainer}>
          {Array.from({ length: registrationSteps.length }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.step,
                index < step ? styles.activeStep : styles.inactiveStep,
              ]}
            />
          ))}
        </View>
        <TouchableOpacity
          style={[styles.button, !stepValid && styles.buttonDisabled]}
          onPress={
            step === registrationSteps.length ? submitRegistration : nextStep
          }
        >
          <Text style={styles.buttonText}>Далі</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 36,
  },
  body: {
    flex: 1,
    flexDirection: "column",
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#3b73b1",
    textAlign: "center",
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#7eaaed",
    paddingVertical: 8,
    paddingHorizontal: 24,
    width: 96,
    borderRadius: 24,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#cecece",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "400",
  },
  buttonTextDisabled: {
    color: "#cecece",
  },
  stepsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  step: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#cecece",
  },
  activeStep: {
    backgroundColor: "#7eaaed",
  },
  inactiveStep: {
    backgroundColor: "#cecece",
  },
});
