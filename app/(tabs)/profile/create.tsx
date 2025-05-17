import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import { postRemoteData } from "@/utils/api";

export default function CreatePostScreen() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [attachments, setAttachments] = useState<string[] | null>(null);
  const handlePickImage = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        copyToCacheDirectory: true,
        multiple: true,
      });
      if (res) {
        setAttachments((prev) => {
          const newUris = res.assets?.map((asset) => asset.uri) || [];
          if (prev) {
            return [...newUris, ...prev];
          }
          return newUris.length > 0 ? newUris : null;
        });
        console.log("Attachment URI:", res.output);
      }
    } catch (err) {}
  };

  function createPost() {
    console.log("Creating post with data:", {
      title: title,
      text: text,
      attachments: attachments,
    });
    postRemoteData("/posts", {
      title: title,
      text: text,
      attachments: attachments,
    }).then(() => {
      router.replace("/profile");
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.actionIcon}
          onPress={() => {
            router.replace("/profile");
          }}
        >
          <Ionicons name="arrow-back" size={32} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Новий допис</Text>
        <View style={styles.actionIcon}></View>
      </View>
      <View style={styles.body}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Тема допису</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Введіть тему допису"
              placeholderTextColor={"#999999"}
              style={[styles.textInput, { outline: "none" }]}
              onChangeText={setTitle}
              value={title}
              autoCapitalize="none"
            />
          </View>
        </View>
        <View style={[styles.inputGroup, { flex: 1 }]}>
          <Text style={styles.label}>Вміст допису</Text>
          <View style={[styles.inputContainer, styles.inputContainerMultiline]}>
            <TextInput
              placeholder="Введіть тему допису"
              placeholderTextColor={"#999999"}
              multiline={true}
              style={[
                styles.textInput,
                styles.textInputMultiline,
                { outline: "none" },
              ]}
              onChangeText={setText}
              value={text}
              autoCapitalize="none"
            />
            {attachments && (
              <View style={styles.attachmentsContainer}>
                {attachments.map((uri) => (
                  <View key={uri} style={styles.attachment}>
                    <TouchableOpacity style={styles.attachmentRemover}>
                      <Feather
                        name="x"
                        size={16}
                        color="white"
                        onPress={() =>
                          setAttachments((prev) => {
                            const filtered =
                              prev?.filter((item) => item !== uri) || [];
                            return filtered.length > 0 ? filtered : null;
                          })
                        }
                      />
                    </TouchableOpacity>
                    <View style={styles.imageContainer}>
                      <Image source={{ uri }} style={styles.image} />
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.actionIcon} onPress={handlePickImage}>
            <Feather name="paperclip" size={32} color="#999999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={createPost}>
            <Text style={styles.buttonText}>Створити</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  header: {
    height: 64,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#cecece",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  body: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  inputContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#cecece",
    borderRadius: 16,
  },
  inputContainerMultiline: {
    flex: 1,
    height: "100%",
  },
  textInput: {
    fontSize: 14,
  },
  textInputMultiline: {
    flex: 1,
    height: "100%",
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    color: "#4a4a4a",
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    backgroundColor: "#7eaaed",
    padding: 16,
    borderRadius: 16,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  actionIcon: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
    flex: 1,
    textAlign: "center",
  },
  attachmentRemover: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#f37070",
    borderRadius: 16,
    height: 24,
    width: 24,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  attachmentsContainer: {
    flexDirection: "row",
    flexWrap: "wrap-reverse",
    gap: 8,
  },
  attachment: {
    width: 96,
    height: 96,
  },
  imageContainer: {
    aspectRatio: 1,
    borderRadius: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
