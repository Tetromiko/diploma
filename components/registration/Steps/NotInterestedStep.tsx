// перейменовано на NotInterestedStep
import React, { useState, useMemo } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import RegistrationStep, { StepValidationProps } from "../RegistrationStep";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ValidatedInput from "./ValidatedInput";

// Приклад тегів для небажаних інтересів (має бути 100+ у реальному додатку)
const EXISTING_TAGS = [
  "спорт",
  "музика",
  "кіно",
  "подорожі",
  "читання",
  "програмування",
  "фотографія",
  "ігри",
  "йога",
  "мода",
  "технології",
  "наука",
  "кулінарія",
  "авто",
  "велоспорт",
  "малювання",
  "танці",
  "театри",
  "тварини",
  "садівництво",
  // ... додайте ще теги ...
];

export default function NotInterestedStep(props: StepValidationProps) {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState<string[]>(
    (props.registrationData.notInterested ?? []) as string[]
  );

  const filteredSuggestions = useMemo(() => {
    if (!input.trim()) return [];
    return EXISTING_TAGS.filter(
      (tag) =>
        tag.toLowerCase().includes(input.trim().toLowerCase()) &&
        !tags.includes(tag)
    ).slice(0, 10);
  }, [input, tags]);

  function checkTag(value: string) {
    if (!value || value.trim() === "") {
      return { isValid: false };
    }
    if (tags.includes(value.trim())) {
      return { isValid: false, message: "Такий тег вже додано" };
    }
    if (value.trim().length < 2) {
      return { isValid: false, message: "Тег має містити мінімум 2 символи" };
    }
    return { isValid: true };
  }

  function removeTag(tag: string) {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    props.updateRegistrationData("notInterested", newTags as any);
  }

  function addTag(tag: string) {
    const trimmedTag = tag.trim();
    if (!trimmedTag) return;
    const newTags = [...tags, trimmedTag];
    setTags(newTags);
    setInput("");
    props.updateRegistrationData("notInterested", newTags as any);
  }

  const tagColors = ["#bdbdbd", "#ffcd26", "#fc7e22", "#f287e5"];
  function tagToInt(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash += str.charCodeAt(i);
    }
    return hash % tagColors.length;
  }

  return (
    <RegistrationStep
      image={require("../../../assets/images/main-character-asks.png")}
      title="Що вам не цікаво?"
      isStepValid={true}
    >
      <View style={styles.inputFields}>
        {tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {tags.map((tag) => (
              <View
                key={tag}
                style={[
                  styles.tag,
                  {
                    backgroundColor: tagColors[tagToInt(tag)],
                  },
                ]}
              >
                <Text style={styles.tagText}>{tag}</Text>
                <TouchableOpacity onPress={() => removeTag(tag)}>
                  <MaterialIcons name="close" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
        <ValidatedInput
          placeholder="Додати нецікавий інтерес"
          validate={checkTag}
          value={input}
          setValue={setInput}
          onSubmitEditing={() => {
            addTag(input);
          }}
        />
        {input.length > 0 && filteredSuggestions.length > 0 && (
          <View style={styles.suggestions}>
            <FlatList
              data={filteredSuggestions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.suggestionItem}
                  onPress={() => {
                    addTag(item);
                  }}
                >
                  <Text style={styles.suggestionText}>{item}</Text>
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
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 4,
  },
  tag: {
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 12,
    backgroundColor: "#bdbdbd",
    gap: 4,
  },
  tagText: {
    color: "#fff",
    fontSize: 16,
  },
  suggestions: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#cecece",
    borderRadius: 8,
    zIndex: 10,
    maxHeight: 160,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  suggestionText: {
    fontSize: 16,
    color: "#222",
  },
});
