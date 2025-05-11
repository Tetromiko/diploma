// Чати
export interface ChatData {
  id: number;
  type: string;
}

export interface ChatPreview {
  id: number;
  type: string;
  avatarUrl?: string;
  title?: string;
  updatedAt: Date;
}

export interface GroupChatData extends ChatData {
  title: string;
  avatarUrl?: string;
  membersIds: number[];
}

export interface PrivateChatData extends ChatData {
  user: UserPreview;
}

// Користувачі
export interface UserPreview {
  id: number;
  avatarUrl?: string;
  nickname?: string;
}

// UserPublic (C# class analogue)
export interface UserPublic {
  id: number;
  nickname: string;
  avatarUrl?: string;
  description: string;
  fullName: string;
}

export interface UserPublicFull extends UserPublic {
  updatedAt: Date;
  createdAt: Date;
  isDeleted: boolean;
  role: string;
  relations: Relation[];
}

export interface Relation {
  type: string;
  count: number;
}

export interface UserFull extends UserPublicFull {
  password: string;
  email: string;
}

export interface UserData {
  id: string;
  nickname: string;
  fullName: string;
  avatarUrl: string;
  description: string;
  role: string;
  updatedAt: string;
  createdAt: string;
  posts: PostData[];
}

export interface PostData {
  id: number;
  title: string;
  text: string;
  attachments: string[];
  chatId: number;
  creator: UserPublic;
  interactions: string[];
}

export interface Interaction {
  id: number;
  type: string;
}

export interface RegistrationFormData {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  fullName: string;
  age: string;
  country: string;
  interests: string[];
  avatar: string;
  notInterested?: string[];
}

export interface RegistrationRequest {
  email: string;
  password: string;
  nickname: string;
  fullName: string;
  avatar: string;
  interests: string[];
  notInterested: string[];
}

export interface MessageData {
  id: string;
  text: string;
  createdAt: Date;
  attachments: string[];
  replyToMessage?: ReplyPreview;
  sender: UserPublic;
  discussionId?: number;
}

export interface ReplyPreview {
  id: number;
  text: string;
  attachment?: string;
}

export interface NotificationData {
  type: string;
  user: UserPublic;
}
