# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

# Структура проєкту

```
/app                # Основна папка з усіма екранами та роутами (file-based routing)
  /home             # Головна стрічка, сповіщення
  /explore          # Пошук користувачів і постів
  /chats            # Чати, список чатів, перегляд чату
  /profile          # Профіль користувача, налаштування, створення посту
  /authorization    # Екрани авторизації та реєстрації
  /[userId]         # Динамічний маршрут для перегляду профілю іншого користувача
  _layout.tsx       # Головний layout для роутів
  (tabs)/_layout.tsx# Layout для табів (нижня навігація)
  index.tsx         # Початковий екран

/components         # Повторно використовувані компоненти (Post, Chat, UserWithButton, ContextMenu тощо)

/constants          # Константи, типи, статичні дані

/contexts           # React Context API (наприклад, ContextMenuContext, AuthentificationContext)

/utils              # Допоміжні функції (api, storage, тощо)

/assets             # Статичні ресурси: зображення, шрифти

/scripts            # Скрипти для обслуговування проєкту (наприклад, reset-project.js)

package.json        # Залежності, скрипти, конфігурація npm
README.md           # Документація проєкту
```

- **app/** — містить усі екрани, згруповані за вкладками та сторінками. Використовується file-based routing Expo Router.
- **components/** — універсальні UI-компоненти, які використовуються на різних екранах.
- **constants/** — типи TypeScript, константи, статичні списки.
- **contexts/** — глобальні контексти для стану (меню, автентифікація тощо).
- **utils/** — утиліти для роботи з API, локальним сховищем, тощо.
- **assets/** — картинки, іконки, шрифти.
- **scripts/** — допоміжні скрипти для розробки.
- **package.json** — залежності та налаштування проєкту.
- **README.md** — документація.

> Основна логіка навігації та сторінок знаходиться у папці **app/**, а всі повторно використовувані частини — у **components/**.
