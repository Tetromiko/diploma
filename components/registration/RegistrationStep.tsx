import { RegistrationFormData } from "@/constants/types";
import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

export interface StepValidationProps {
  onStepValidChange?: (isValid: boolean) => void;
  registrationData: RegistrationFormData;
  updateRegistrationData: (field: string, value: string[]) => void;
}

interface RegistrationStepProps {
  image: any;
  title: string;
  children?: React.ReactNode;
  isStepValid?: boolean;
}

export default function RegistrationStep(props: RegistrationStepProps) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={props.image} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        {props.children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 16,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "40%",
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  scrollView: {
    width: "100%",
    maxWidth: 512,
  },
});
