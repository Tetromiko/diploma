import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { clamp } from "react-native-reanimated";

export default function RegisterScreen() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [displayName, setDisplayName] = useState(""); // новий стан для імені користувача
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [topics, setTopics] = useState(""); // новий стан для тем
  const [uninterestedTopics, setUninterestedTopics] = useState(""); // стан для нецікавих тем
  const [selectedInterests, setSelectedInterests] = useState<{
    [key: string]: string;
  }>({});
  const [country, setCountry] = useState("");
  const [countrySuggestions, setCountrySuggestions] = useState<string[]>([]);
  const [age, setAge] = useState(""); // новий стан для віку
  const [touchedFields, setTouchedFields] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    nickname: false,
    age: false, // додали для віку
    displayName: false, // додати для імені користувача
  });

  const avatarImages = [
    require("../../assets/images/avatar1.png"),
    require("../../assets/images/avatar2.png"),
    require("../../assets/images/avatar3.png"),
    require("../../assets/images/avatar4.png"),
    require("../../assets/images/avatar5.png"),
    require("../../assets/images/avatar6.png"),
    require("../../assets/images/avatar7.png"),
    require("../../assets/images/avatar8.png"),
  ];

  const interestOptions = [
    "Музика",
    "Книги",
    "Малювання",
    "Спорт",
    "Технології",
    "Подорожі",
    "Кіно",
    "Фотографія",
    "Геймінг",
    "Кулінарія",
    "Танці",
    "Наука",
    "Мода",
    "Театр",
    "Тварини",
  ];
  const interestColors = ["#55a5fe", "#f186f0", "#ffcd20"];

  const countriesList = [
    "Україна",
    "Польща",
    "Німеччина",
    "Франція",
    "Італія",
    "Іспанія",
    "США",
    "Канада",
    "Велика Британія",
    "Чехія",
    "Словаччина",
    "Угорщина",
    "Румунія",
    "Болгарія",
    "Туреччина",
    "Литва",
    "Латвія",
    "Естонія",
    "Швеція",
    "Норвегія",
    "Данія",
    "Фінляндія",
    "Австрія",
    "Швейцарія",
    "Бельгія",
    "Нідерланди",
    "Португалія",
    "Греція",
    "Інші",
  ];

  function toggleInterest(interest: string) {
    setSelectedInterests((prev) => {
      if (prev[interest]) {
        const copy = { ...prev };
        delete copy[interest];
        return copy;
      } else {
        const color =
          interestColors[Math.floor(Math.random() * interestColors.length)];
        return { ...prev, [interest]: color };
      }
    });
  }

  function handleCountryChange(text: string) {
    setCountry(text);
    if (text.length > 0) {
      setCountrySuggestions(
        countriesList.filter((c) =>
          c.toLowerCase().includes(text.toLowerCase())
        )
      );
    } else {
      setCountrySuggestions([]);
    }
  }

  const nextStep = () =>
    setStep((prev) => clamp(prev + 1, 1, registrationSteps.length));
  const prevStep = () =>
    setStep((prev) => clamp(prev - 1, 1, registrationSteps.length));

  const handleBlur = (field: string) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  function checkNickname(value: string) {
    const isCharactersValid = /^[a-zA-Z0-9_]+$/.test(value);
    const isFree = true;
    const isLengthValid = value.length >= 3 && value.length <= 20;

    if (!isLengthValid) {
      return { isValid: false, message: "Нікнейм має містити 3-20 символів" };
    }
    if (!isCharactersValid) {
      return {
        isValid: false,
        message: "Нікнейм може містити літери, цифри та знак _",
      };
    }
    if (!isFree) {
      return { isValid: false, message: "На жаль, введений нікнейм зайнятий" };
    }
    return { isValid: true, message: "Введений нікнейм доступний" };
  }

  function checkPassword(value: string) {
    const isLengthValid = value.length >= 8;
    const isUpperCaseValid = /[A-Z]/.test(value);
    const isLowerCaseValid = /[a-z]/.test(value);
    const isNumberValid = /\d/.test(value);
    const isSpecialCharacterValid = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    if (!isLengthValid) {
      return { isValid: false, message: "Пароль має містити 8+ символів" };
    }
    if (!isUpperCaseValid) {
      return { isValid: false, message: "Пароль має містити велику літеру" };
    }
    if (!isLowerCaseValid) {
      return { isValid: false, message: "Пароль має містити малу літеру" };
    }
    if (!isNumberValid) {
      return { isValid: false, message: "Пароль має містити цифру" };
    }
    if (!isSpecialCharacterValid) {
      return { isValid: false, message: "Пароль має містити спецсимвол" };
    }
    return { isValid: true, message: null };
  }

  function checkConfirmPassword(value: string) {
    if (value !== password) {
      return { isValid: false, message: "Паролі не співпадають" };
    }
    return { isValid: true, message: null };
  }

  function checkEmail(value: string) {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!isEmailValid) {
      return { isValid: false, message: "Введіть коректну електронну пошту" };
    }
    return { isValid: true, message: null };
  }

  function checkAge(value: string) {
    const num = Number(value);
    if (!value || isNaN(num)) {
      return { isValid: false, message: "Введіть ваш вік" };
    }
    if (num < 13) {
      return { isValid: false, message: "Вік має бути не менше 13 років" };
    }
    return { isValid: true, message: null };
  }

  const registrationSteps = [
    {
      step: 1,
      image: require("../../assets/images/login.png"),
      title: "Введіть електронну пошту та пароль",
      requiresValidation: true,
      inputs: [
        {
          placeholder: "Електронна пошта",
          value: email,
          onChange: setEmail,
          onBlur: () => handleBlur("email"),
          field: "email",
          keyboardType: "email-address",
          secureTextEntry: false,
          validation: checkEmail,
        },
        {
          placeholder: "Пароль",
          value: password,
          onChange: setPassword,
          onBlur: () => handleBlur("password"),
          field: "password",
          keyboardType: "default",
          secureTextEntry: true,
          validation: checkPassword,
        },
        {
          placeholder: "Введіть пароль ще раз",
          value: confirmPassword,
          onChange: setConfirmPassword,
          onBlur: () => handleBlur("confirmPassword"),
          field: "confirmPassword",
          keyboardType: "default",
          secureTextEntry: true,
          validation: checkConfirmPassword,
        },
      ],
    },
    {
      step: 2,
      image: require("../../assets/images/main-characters-network.png"),
      title: "Введіть обраний Вами нікнейм",
      requiresValidation: true,
      inputs: [
        {
          placeholder: "Нікнейм",
          value: nickname,
          onChange: setNickname,
          onBlur: () => handleBlur("nickname"),
          field: "nickname",
          keyboardType: "default",
          secureTextEntry: false,
          validation: checkNickname,
        },
      ],
    },
    {
      step: 3,
      image: require("../../assets/images/main-character-asks.png"),
      title: "Як до Вас можна звертатися?",
      requiresValidation: true,
      inputs: [
        {
          placeholder: "Введіть відповідь тут...",
          value: displayName,
          onChange: setDisplayName,
          onBlur: () => handleBlur("displayName"),
          field: "displayName",
          keyboardType: "default",
          secureTextEntry: false,
          validation: (value: string) => {
            if (!value || value.length < 1) {
              return { isValid: false, message: "Введіть хоча б один символ" };
            }
            return { isValid: true, message: null };
          },
        },
      ],
    },
    {
      step: 4,
      image: require("../../assets/images/selectCountry.png"),
      title: "Оберіть країну в якій проживаєте",
      requiresValidation: true,
      inputs: [
        {
          placeholder: "Введіть відповідь тут...",
          value: country,
          onChange: (text: string) => {
            handleCountryChange(text);
          },
          onBlur: () => handleBlur("country"),
          field: "country",
          keyboardType: "default",
          secureTextEntry: false,
          validation: (value: string) => {
            if (!value || value.length < 1) {
              return { isValid: false, message: "Оберіть країну" };
            }
            return { isValid: true, message: null };
          },
          isCountryInput: true, // додатковий прапорець для підказок
        },
      ],
    },
    {
      step: 5,
      image: require("../../assets/images/age.png"),
      title: "Вкажіть ваш вік",
      requiresValidation: true,
      inputs: [
        {
          placeholder: "Введіть ваш вік",
          value: age,
          onChange: setAge,
          onBlur: () => handleBlur("age"),
          field: "age",
          keyboardType: "numeric",
          secureTextEntry: false,
          validation: checkAge,
        },
      ],
    },
    {
      step: 6,
      title: "Оберіть аватарку",
      isAvatarStep: true,
      requiresValidation: true,
    },
    {
      step: 7,
      title: "Оберіть теми, що Вас цікавлять",
      isTopicsStep: true,
      requiresValidation: false,
    },
    {
      step: 8,
      title: "Оберіть нецікаві Вам теми",
      isUninterestedTopicsStep: true,
      requiresValidation: false,
    },
    {
      step: 9,
      title: "Умови використання додатку",
      isTermsStep: true,
      requiresValidation: false,
    },
    {
      step: 10,
      title: "Вітаємо із завершення реєстрації!",
      isFinalStep: true,
      image: require("../../assets/images/main-characters-network.png"),
      requiresValidation: false,
    },
  ];

  // Перевірка валідності всіх полів поточного кроку
  function isCurrentStepValid() {
    const currentStep = registrationSteps[step - 1];
    if (!currentStep.inputs) return true;
    return currentStep.inputs.every((input) => {
      const value = input.value;
      const valid = input.validation(value);
      return valid.isValid;
    });
  }

  const currentStepObj = registrationSteps[step - 1];
  const isStep6Valid = step === 6 ? selectedAvatar !== null : true;
  const isNextActive = currentStepObj.requiresValidation
    ? step === 6
      ? isStep6Valid
      : isCurrentStepValid()
    : true;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>РЕЄСТРАЦІЯ</Text>
      </View>
      <View style={styles.body}>
        {registrationSteps[step - 1].inputs ? (
          <>
            <View style={styles.imageContainer}>
              <Image
                source={registrationSteps[step - 1].image}
                style={styles.image}
              />
            </View>
            <View style={styles.loginContainer}>
              <Text style={styles.title}>
                {registrationSteps[step - 1].title}
              </Text>
              <View style={styles.inputFields}>
                {registrationSteps[step - 1].inputs.map((input, index) => (
                  <View key={index}>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={[
                          styles.inputField,
                          { outlineColor: "none", outline: "none" },
                        ]}
                        placeholder={input.placeholder}
                        placeholderTextColor="#999999"
                        value={input.value}
                        onChangeText={input.onChange}
                        onBlur={input.onBlur}
                        keyboardType={input.keyboardType}
                        secureTextEntry={input.secureTextEntry}
                      />
                    </View>
                    {/* Підказки для країни */}
                    {input.isCountryInput && countrySuggestions.length > 0 && (
                      <View style={styles.suggestionsContainer}>
                        {countrySuggestions.map((c) => (
                          <TouchableOpacity
                            key={c}
                            style={styles.suggestionItem}
                            onPress={() => {
                              setCountry(c);
                              setCountrySuggestions([]);
                            }}
                          >
                            <Text style={styles.suggestionText}>{c}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                    {touchedFields[input.field] &&
                      input.validation(input.value).message && (
                        <View style={styles.messageContainer}>
                          <MaterialIcons
                            name={"error"}
                            size={24}
                            color="#f37070"
                            style={styles.messageIcon}
                          />
                          <Text style={styles.messageText}>
                            {input.validation(input.value).message}
                          </Text>
                        </View>
                      )}
                  </View>
                ))}
              </View>
            </View>
          </>
        ) : registrationSteps[step - 1].isAvatarStep ? (
          <View style={styles.avatarStepContainer}>
            <Text style={styles.title}>Оберіть аватарку</Text>
            <View style={styles.avatarGrid}>
              {[0, 1, 2, 3].map((row) => (
                <View key={row} style={styles.avatarRow}>
                  {[0, 1].map((col) => {
                    const idx = row * 2 + col;
                    if (idx >= avatarImages.length) return null;
                    return (
                      <TouchableOpacity
                        key={idx}
                        style={[
                          styles.avatarWrapper,
                          selectedAvatar === idx && styles.avatarSelected,
                        ]}
                        onPress={() => setSelectedAvatar(idx)}
                        activeOpacity={0.7}
                      >
                        <Image
                          source={avatarImages[idx]}
                          style={styles.avatarImage}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}
            </View>
          </View>
        ) : registrationSteps[step - 1].isTopicsStep ? (
          <View style={styles.topicsStepContainer}>
            <Text style={styles.title}>Оберіть теми, що вас цікавлять</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                placeholder="Введіть тему "
                placeholderTextColor="#999999"
                value={topics}
                onChangeText={setTopics}
              />
            </View>
            <View style={styles.interestsWrap}>
              {interestOptions.map((interest) => {
                const selectedColor = selectedInterests[interest];
                let textColor = "#808080";
                if (selectedColor === "#55a5fe") textColor = "#fff";
                else if (selectedColor === "#f186f0") textColor = "#4d4d4d";
                else if (selectedColor === "#ffcd20") textColor = "#4d4d4d";
                return (
                  <TouchableOpacity
                    key={interest}
                    style={[
                      styles.interestButton,
                      selectedColor && {
                        backgroundColor: selectedColor,
                        borderColor: selectedColor,
                      },
                    ]}
                    onPress={() => toggleInterest(interest)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.interestButtonText,
                        selectedColor && { color: textColor },
                      ]}
                    >
                      {interest}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ) : registrationSteps[step - 1].isUninterestedTopicsStep ? (
          <View style={styles.topicsStepContainer}>
            <Text style={styles.title}>Оберіть нецікаві вам теми</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                placeholder="Введіть тему"
                placeholderTextColor="#999999"
                value={uninterestedTopics}
                onChangeText={setUninterestedTopics}
              />
            </View>
          </View>
        ) : registrationSteps[step - 1].isTermsStep ? (
          <View style={styles.topicsStepContainer}>
            <Text style={styles.title}>Умови використання додатку</Text>
            <View style={styles.termsContainer}>
              <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsHorizontalScrollIndicator={false}
              >
                <Text style={styles.mainContainerContent}>
                  {`Перед початком використання мобільного додатку уважно ознайомтесь із цими правилами. Реєструючись у додатку, Ви підтверджуєте, що ознайомлені з умовами та погоджуєтесь їх дотримуватись.
1. Загальні положення
1.1. Ця платформа створена для спілкування користувачів на основі спільних інтересів.
1.2. Метою додатку є створення безпечного, доброзичливого та змістовного середовища для обміну думками, контентом і досвідом.
1.3. Використання додатку є добровільним та безкоштовним (монетизація може з’явитись пізніше з попередженням користувачів).

2. Обліковий запис користувача
2.1. Для повноцінного доступу до функціоналу необхідна реєстрація.
2.2. Ви зобов’язуєтесь надавати правдиву інформацію під час реєстрації та користування додатком.
2.3. Ви несете відповідальність за збереження конфіденційності свого пароля та доступу до облікового запису.

3. Поведінка в додатку
3.1. Заборонено:
- ображати інших користувачів або використовувати мову ворожнечі;
- публікувати неприйнятний, непристойний чи незаконний контент;
- видавати себе за іншу особу;
- використовувати додаток з метою спаму, шахрайства чи маніпуляцій.

3.2. Ви погоджуєтесь дотримуватись норм етикету, поваги та законів.

4. Контент і інтереси
4.1. Контент, який ви створюєте, повинен відповідати тематиці додатку.
4.2. Система підбирає співрозмовників автоматично, на основі вподобань.
4.3. Ви маєте право редагувати або видаляти свій контент у будь-який момент.

5. Безпека та модерація
5.1. Адміністрація залишає за собою право обмежити доступ до додатку користувачам, які порушують правила.
5.2. Ми залишаємо за собою право видаляти контент, який порушує умови або шкодить спільноті.
5.3. У разі серйозних порушень інформація може бути передана відповідним органам.

6. Зміни до правил
6.1. Умови використання можуть бути оновлені. У такому разі ми повідомимо вас про зміни. Продовження використання додатку означає вашу згоду з оновленими правилами.

7. Підтвердження згоди
Реєструючись або використовуючи додаток, ви підтверджуєте, що прочитали ці умови, зрозуміли їх та погоджуєтесь дотримуватись.
`}
                </Text>
              </ScrollView>
            </View>
          </View>
        ) : registrationSteps[step - 1].isFinalStep ? (
          <View style={styles.finalStepContainer}>
            <Image
              source={registrationSteps[step - 1].image}
              style={styles.finalStepImage}
              resizeMode="contain"
            />
            <Text style={styles.finalStepText}>
              Вітаємо із завершення реєстрації
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.imageContainer}>
              <Image
                source={registrationSteps[step - 1].image}
                style={styles.image}
              />
            </View>
            <View style={styles.loginContainer}>
              <Text style={styles.title}>
                {registrationSteps[step - 1].title}
              </Text>
              <View style={styles.inputFields}>
                {registrationSteps[step - 1].inputs.map((input, index) => (
                  <View key={index}>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={[
                          styles.inputField,
                          { outlineColor: "none", outline: "none" },
                        ]}
                        placeholder={input.placeholder}
                        placeholderTextColor="#999999"
                        value={input.value}
                        onChangeText={input.onChange}
                        onBlur={input.onBlur}
                        keyboardType={input.keyboardType}
                        secureTextEntry={input.secureTextEntry}
                      />
                    </View>
                    {touchedFields[input.field] &&
                      input.validation(input.value).message && (
                        <View style={styles.messageContainer}>
                          <MaterialIcons
                            name={"error"}
                            size={24}
                            color="#f37070"
                            style={styles.messageIcon}
                          />
                          <Text style={styles.messageText}>
                            {input.validation(input.value).message}
                          </Text>
                        </View>
                      )}
                  </View>
                ))}
              </View>
            </View>
          </>
        )}
      </View>
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
          style={[styles.button, !isNextActive && styles.buttonDisabled]}
          onPress={() => {
            if (isNextActive) nextStep();
          }}
          activeOpacity={isNextActive ? 0.7 : 1}
          disabled={!isNextActive}
        >
          <Text
            style={[
              styles.buttonText,
              !isNextActive && styles.buttonTextDisabled,
            ]}
          >
            Далі
          </Text>
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
  actionIcon: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  appTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3b73b1",
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: 360,
    height: 360,
  },
  title: {
    fontSize: 18,
    fontWeight: "400",
    color: "#3b73b1",
    textAlign: "center",
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#3b73b1",
    textAlign: "center",
    flex: 1,
  },
  loginContainer: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 16,
  },
  inputFields: {
    gap: 12,
    flex: 1,
  },
  inputContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: "#cecece",
  },
  inputField: {
    color: "#4d4d4d",
    fontSize: 16,
    fontWeight: "400",
  },
  forgotPassword: {
    fontSize: 14,
    color: "#7eaaed",
    textAlign: "right",
  },
  loginButtonContainer: {
    gap: 16,
    paddingHorizontal: 96,
  },
  loginButton: {
    backgroundColor: "#7eaaed",
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  registerText: {
    fontSize: 14,
    color: "#999999",
  },
  registerLink: {
    fontSize: 14,
    color: "#7eaaed",
    fontWeight: "500",
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
    width: 90,
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
  stepText: {
    fontSize: 14,
    color: "#666666",
  },
  topBorder: {
    borderTopWidth: 1,
    borderTopColor: "#7eaaed",
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  messageIcon: {},
  messageText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#999999",
  },
  avatarStepContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 28,
  },
  avatarGrid: {
    gap: 24,
    width: "100%",
    alignItems: "center",
  },
  avatarRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
  },
  avatarWrapper: {
    width: 80,
    height: 80,
    borderRadius: 20,
    borderColor: "transparent",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarSelected: {
    borderColor: "#cecece",
    borderWidth: 3,
  },
  avatarImage: {
    width: 72,
    height: 72,
  },
  topicsStepContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 0,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#cecece",
    paddingTop: 8,
    paddingBottom: 12,
  },
  scrollContainer: {
    paddingHorizontal: 24,
  },
  mainContainerContent: {
    fontSize: 14,
    fontWeight: "400",
    color: "#808080",
    textAlign: "justify",
  },
  termsContainer: {
    height: 600,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#cecece",
    paddingTop: 24,
    paddingBottom: 24,
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: "auto",
    width: "100%",
  },
  finalStepContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    paddingHorizontal: 16,
  },
  finalStepImage: {
    width: 220,
    height: 220,
    marginBottom: 16,
  },
  finalStepText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#3b73b1",
    textAlign: "center",
  },
  interestsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
    width: "100%",
    justifyContent: "center",
  },
  interestButton: {
    backgroundColor: "#ffffff", // білий фон
    borderColor: "#cecece", // сіра рамка
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    margin: 6,
  },
  interestButtonText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#808080",
    textAlign: "center",
  },
  suggestionsContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#cecece",
    marginTop: 8,
    padding: 8,
  },
  suggestionItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  suggestionText: {
    fontSize: 16,
    color: "#4d4d4d",
  },
});
