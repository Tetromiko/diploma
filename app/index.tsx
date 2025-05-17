import { useEffect } from "react";
import { useRootNavigationState, useRouter } from "expo-router";
import { setApiUrl } from "@/utils/api";
import { Platform } from "react-native";
import { setStorageConfiguration } from "@/utils/storage";

export default function Index() {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigationState?.key) return;

    router.replace("/home");
  }, [rootNavigationState]);

  return null;
}
