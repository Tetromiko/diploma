import { AVATAR_LIST } from "./avatars";

export default function getUserAvatar(avatarUrl: string) {
  if (!avatarUrl) {
    // fallback: return the first avatar or a default object if not-found.png does not exist
    return AVATAR_LIST[0] || { uri: "" };
  }
  if (avatarUrl.startsWith("preset_")) {
    const idx = parseInt(avatarUrl.split("_")[1]);
    if (
      Array.isArray(AVATAR_LIST) &&
      !isNaN(idx) &&
      idx >= 0 &&
      idx < AVATAR_LIST.length
    ) {
      return AVATAR_LIST[idx];
    }
    return AVATAR_LIST[0] || { uri: "" };
  } else {
    return { uri: avatarUrl };
  }
}
