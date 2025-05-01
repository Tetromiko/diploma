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
import UserWithButton from "@/components/UserWithButton";

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
        <Text style={styles.headerTitle}>Центр конфіденційності</Text>
        <View style={styles.actionIcon}></View>
      </View>
      <View style={styles.body}>
        <View style={styles.mainContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsHorizontalScrollIndicator={false}
          >
            <Text style={styles.mainContainerContent}>
              Ми серйозно ставимося до конфіденційності ваших даних 🛡️. <br />
              Цей застосунок створений із турботою про вашу безпеку, прозорість
              і контроль над особистою інформацією. Ми хочемо, щоб ви почувались
              захищено, користуючись нашим простором для спілкування. <br />
              Зібрані нами дані використовуються лише для коректної роботи
              застосунку. Це, зокрема, ваше ім’я, електронна пошта, аватар та
              інша інформація, яку ви самостійно додаєте до профілю або в
              публікації. Ми не передаємо, не продаємо і не використовуємо ці
              дані в комерційних цілях без вашої згоди. <br />
              Ваш пароль зберігається у зашифрованому вигляді. Ми не маємо
              доступу до нього і не зберігаємо його у відкритому вигляді. Ваші
              приватні повідомлення також залишаються конфіденційними — вони
              доступні лише вам і вашому співрозмовнику. <br />У вас завжди є
              право на повне видалення облікового запису та всіх пов’язаних з
              ним даних. Також ми пропонуємо можливість тимчасово деактивувати
              профіль, якщо ви хочете зробити паузу у використанні застосунку,
              але зберегти свої дані. <br />
              📌 Ми радимо пильно ставитися до того, яку інформацію ви
              публікуєте у відкритому доступі. Не рекомендується ділитися
              номерами телефонів, адресами, документами чи іншими чутливими
              даними у публічних постах або коментарях. <br />
              Якщо у вас виникнуть питання щодо використання ваших даних або ви
              помітите щось підозріле — будь ласка, скористайтеся сторінкою
              «Повідомити про проблему». Ми уважно ставимося до кожного
              звернення і робимо все, аби забезпечити безпечне середовище для
              всіх. 🤝 Довіра — це основа нашої спільноти. Дякуємо, що ви з нами
              💬
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
