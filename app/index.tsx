import { useEffect } from "react";
import { router, useRootNavigationState } from "expo-router";
import { setApiUrl, isTokenValid } from "@/utils/api";

export default function Index() {
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigationState?.key) return;

    if (__DEV__) {
      setApiUrl("https://localhost:7232/api");
    } else {
      setApiUrl("https://api.example.com");
    }
    (async () => {
      if (isTokenValid()) {
        router.replace("/home");
      } else {
        router.replace("/authorization");
      }
    })();
  }, [rootNavigationState?.key]);

  return null;
}
