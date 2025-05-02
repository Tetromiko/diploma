export const UsersPublic = [
  {
    id: "1",
    nickname: "Джон Доу",
    name: "Любитель кави",
    avatar: "https://avatar.iran.liara.run/public?1",
    bio: "Розробник ПЗ, музикант, художник та поціновувач кави",
  },
  {
    id: "2",
    nickname: "Джейн Сміт",
    name: "Джейн мандрінвиця",
    avatar: "https://avatar.iran.liara.run/public?2",
    bio: "Люблю подорожі та книги",
  },
  {
    id: "3",
    nickname: "Аліса Джонсон",
    name: "Аліса",
    avatar: "https://avatar.iran.liara.run/public?3",
    bio: "Фотограф та мандрівниця",
  },
  {
    id: "4",
    nickname: "Боб Мартін",
    name: "Равлик Боб",
    avatar: "https://avatar.iran.liara.run/public?4",
    bio: "Спортсмен та фітнес-тренер",
  },
  {
    id: "5",
    nickname: "Сара Коннор",
    name: "Коннор із Детройту",
    avatar: "https://avatar.iran.liara.run/public?5",
    bio: "Технологічний ентузіаст та стартапер",
  },
  {
    id: "6",
    nickname: "Том Круз",
    name: "Просто Том Круз",
    avatar: "https://avatar.iran.liara.run/public?6",
    bio: "Кінорежисер та сценарист",
  },
  {
    id: "7",
    nickname: "Емма Стоун",
    name: "Емма із сутінок",
    avatar: "https://avatar.iran.liara.run/public?7",
    bio: "Актриса та модель",
  },
];
/*
Title
@post: id
@message: id

дискусія 
чат - набір повідомлень
притватний чат - має двох учасників
група - має довільну кількість учасників
чат щодо поста - має необмежену нефіксовано кількість учасників вони не записуються як учасники
*/

export const Posts = [
  {
    id: "1",
    ownerId: "1",
    title: "Перший пост",
    content: "Це мій перший пост!",
    createdAt: "2024-06-01T10:00:00Z",
  },
  {
    id: "2",
    ownerId: "2",
    title: "Привіт усім",
    content: "Гарного дня!",
    createdAt: "2024-06-02T12:00:00Z",
  },
  {
    id: "3",
    ownerId: "3",
    title: "Новий день",
    content: "Сонце світить яскраво!",
    createdAt: "2024-06-03T09:30:00Z",
  },
];

export const MyPostIds = Posts.filter((p) => p.ownerId === "1").map(
  (p) => p.id
);

export const LikedPostIds = ["2", "3"];

export const SavedPostIds = ["1", "3"];

export const MyPosts = Posts.filter((p) => MyPostIds.includes(p.id));
export const LikedPosts = Posts.filter((p) => LikedPostIds.includes(p.id));
export const SavedPosts = Posts.filter((p) => SavedPostIds.includes(p.id));

export const Chats = [
  {
    id: "1",
    participants: ["1", "2"],
    createdAt: "2024-06-01T11:00:00Z",
  },
  {
    id: "2",
    participants: ["1", "3"],
    createdAt: "2024-06-02T13:00:00Z",
  },
];

export const PrivateChats = [
  {
    id: "1",
    companionId: "2",
    createdAt: "2024-06-01T11:00:00Z",
  },
  {
    id: "2",
    companionId: "3",
    createdAt: "2024-06-02T13:00:00Z",
  },
  {
    id: "3",
    companionId: "4",
    createdAt: "2024-06-03T14:00:00Z",
  },
  {
    id: "4",
    companionId: "5",
    createdAt: "2024-06-04T15:00:00Z",
  },
];

export const Messages = [
  {
    id: "1",
    chatId: "1",
    senderId: "1",
    text: "Привіт, як справи?",
    time: "12:00",
    read: true,
  },
  {
    id: "2",
    chatId: "1",
    senderId: "2",
    text: "Все добре, дякую! А ти?",
    time: "12:01",
    read: true,
  },
  {
    id: "3",
    chatId: "2",
    senderId: "1",
    text: "Привіт, Аліса!",
    time: "13:00",
    read: true,
  },
  {
    id: "4",
    chatId: "2",
    senderId: "3",
    text: "Привіт, Джон!",
    time: "13:01",
    read: true,
  },
  {
    id: "5",
    chatId: "2",
    senderId: "1",
    text: "Як ти?",
    time: "13:02",
    read: true,
  },
  {
    id: "6",
    chatId: "2",
    senderId: "3",
    text: "Все добре, дякую!",
    time: "13:03",
    read: true,
  },
  {
    id: "7",
    chatId: "3",
    senderId: "1",
    text: "Привіт, Боб!",
    time: "14:00",
    read: true,
  },
  {
    id: "8",
    chatId: "4",
    senderId: "5",
    text: "Привіт, Джон!",
    time: "14:01",
    read: true,
  },
  {
    id: "101",
    chatId: "1",
    senderId: "2",
    text: "Ти бачив новий фільм?",
    time: "18:45",
    read: false,
  },
  {
    id: "201",
    chatId: "3",
    senderId: "4",
    text: "Привіт! Як справи?",
    time: "09:10",
    read: false,
  },
  {
    id: "202",
    chatId: "3",
    senderId: "4",
    text: "Маєш час сьогодні зустрітись?",
    time: "09:12",
    read: false,
  },
];

export const FollowingIds = ["2", "3", "4"];

export const FollowersIds = ["2", "3", "5"];

export const BlockedIds = ["6", "7"];

export const Notifications = [
  {
    id: "1",
    type: "subscription",
    userId: "2",
    createdAt: "2024-06-01T12:00:00Z",
  },
  {
    id: "2",
    type: "friend",
    userId: "3",
    createdAt: "2024-06-02T13:00:00Z",
  },
];
