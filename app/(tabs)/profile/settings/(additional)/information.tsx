import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function BlockedScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.actionIcon}
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="arrow-back" size={32} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Інформація</Text>
        <View style={styles.actionIcon}></View>
      </View>
      <View style={styles.body}>
        <View style={styles.mainContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsHorizontalScrollIndicator={false}
          >
            <Text style={styles.mainContainerContent}>
              Цей застосунок створено як простір для спілкування людей, яких
              об’єднують спільні інтереси. Тут ви можете знайомитися,
              приєднуватися до спільнот за темами, що вас цікавлять,
              обговорювати ідеї, ділитися досвідом і знаходити однодумців. Ми
              прагнемо забезпечити комфортне, доброзичливе та безпечне
              середовище для всіх користувачів. Застосунок є частиною дипломного
              проєкту, тому наразі не призначений для публічного використання, а
              деякі функції можуть бути в процесі розробки або тестування. Якщо
              ви помітили, що щось працює некоректно, ви завжди можете
              повідомити нас через сторінку «Повідомити про проблему». Якщо ви
              зіткнулися з порушенням правил чи неприйнятною поведінкою з боку
              іншого користувача — будь ласка, скористайтеся функцією скарги у
              його профілі. Ми закликаємо всіх дотримуватися культури
              взаємоповаги: спілкуватися ввічливо, не ображати інших, уникати
              мови ворожнечі, дискримінації та агресії. Пам’ятайте, що за кожним
              профілем стоїть реальна людина, тому важливо проявляти емпатію та
              доброзичливість. У застосунку заборонено розміщувати контент, що
              містить сцени насильства, жорстокості, порнографію, мову
              ненависті, заклики до дискримінації чи ворожнечі, неправдиву або
              маніпулятивну інформацію, спам, небажану рекламу, а також будь-які
              матеріали, що порушують закон або права інших осіб. Ми намагаємось
              забезпечити дотримання правил, але саме завдяки вашій
              відповідальності та активності цей простір може залишатися
              дружнім, відкритим і безпечним для всіх. Застосунок є частиною
              дипломного проєкту й наразі не призначений для комерційного
              використання або загального доступу. Деякі функції можуть бути в
              процесі розробки та тестування. Дякуємо за вашу зацікавленість і
              бажання спробувати щось нове разом із нами 💬✨
            </Text>
          </ScrollView>
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
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#cecece",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
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
  body: {
    flex: 1,
    padding: 16,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#cecece",
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  mainContainerContent: {
    fontSize: 16,
    fontWeight: "400",
    color: "#808080",
    textAlign: "justify",
  },
});
