import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import RegistrationStep, { StepValidationProps } from "../RegistrationStep";
import { AVATAR_LIST } from "@/constants/avatars";

export default function AvatarStep(props: StepValidationProps) {
  const [selected, setSelected] = useState<string>(
    props.registrationData.avatar || "preset_0"
  );

  useEffect(() => {
    props.onStepValidChange?.(!!selected);
  }, [selected, props]);

  function handleSelectAvatar(avatar: string) {
    setSelected(avatar);
    props.updateRegistrationData("avatar", avatar);
  }

  return (
    <RegistrationStep
      image={require("@/assets/images/registration/avatar.png")}
      title="Оберіть аватар"
      isStepValid={!!selected}
    >
      <View style={styles.avatarsGrid}>
        {Array.from({ length: 2 }).map((_, rowIdx) => (
          <View key={rowIdx} style={styles.avatarRow}>
            {AVATAR_LIST.slice(rowIdx * 4, rowIdx * 4 + 4).map(
              (avatar, colIdx) => {
                const idx = rowIdx * 4 + colIdx;
                return (
                  <TouchableOpacity
                    key={idx}
                    style={[
                      styles.avatar,
                      selected === `preset_${idx}` && styles.avatarSelected,
                    ]}
                    onPress={() => handleSelectAvatar(`preset_${idx}`)}
                  >
                    <Image source={avatar} style={styles.avatarImg} />
                  </TouchableOpacity>
                );
              }
            )}
          </View>
        ))}
      </View>
    </RegistrationStep>
  );
}

const styles = StyleSheet.create({
  avatarsGrid: {
    flexDirection: "column",
    gap: 16,
  },
  avatarRow: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "center",
  },
  avatar: {
    width: 64,
    height: 64,
    borderWidth: 4,
    borderColor: "transparent",
    borderRadius: 32,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
  },
  avatarSelected: {
    borderColor: "#7eaaed",
  },
  avatarImg: {
    width: 48,
    height: 48,
  },
});
