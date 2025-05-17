import AsyncStorage from "@react-native-async-storage/async-storage";

var storageConfiguration = {
  platform: "web",
};

export function setStorageConfiguration(config: { platform: string }) {
  storageConfiguration = config;
}

export async function saveData<T>(key: string, data: T) {
  if (storageConfiguration.platform === "web") {
    localStorage.setItem(key, JSON.stringify(data));
  } else {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  }
}

export async function getData<T>(key: string): Promise<T | null> {
  if (storageConfiguration.platform === "web") {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } else {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
}

export function removeData(key: string) {
  if (storageConfiguration.platform === "web") {
    localStorage.removeItem(key);
  } else {
    AsyncStorage.removeItem(key);
  }
}
