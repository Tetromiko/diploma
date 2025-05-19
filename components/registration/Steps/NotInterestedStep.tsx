import React, { useState, useEffect } from "react";
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
import { getRemoteData } from "@/utils/api";

export default function NotInterestedStep(props: StepValidationProps) {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState<string[]>(
    (props.registrationData.notInterested ?? []) as string[]
  );

  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (!input.trim()) {
      setFilteredSuggestions([]);
      return;
    }

    let isActive = true;
    getRemoteData(`/tags?limit=10&filter=${input.trim().toLowerCase()}`).then(
      (data: string[]) => {
        if (isActive)
          setFilteredSuggestions(
            data.filter(
              (tag) =>
                !tags.includes(tag) &&
                !props.registrationData.interests?.includes(tag)
            )
          );
      }
    );
    return () => {
      isActive = false;
    };
  }, [input, tags]);

  function checkTag(value: string) {
    if (!value || value.trim() === "") {
      return { isValid: false };
    }
    if (props.registrationData.interests?.includes(value.trim())) {
      return { isValid: false, message: "Цей тег вже додано в 'Цікавить'" };
    }
    if (tags.includes(value.trim())) {
      return { isValid: false, message: "Такий тег вже додано" };
    }
    return { isValid: true };
  }

  function removeTag(tag: string) {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    props.updateRegistrationData("notInterested", newTags);
  }

  function addTag(tag: string) {
    const trimmedTag = tag.trim();
    if (!trimmedTag) return;
    const newTags = [...tags, trimmedTag];
    setTags(newTags);
    setInput("");
    props.updateRegistrationData("notInterested", newTags);
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
      image={require("@/assets/images/registration/interests.png")}
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
            if (!checkTag(input).isValid) return;
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
