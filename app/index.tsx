import { useEffect } from "react";
import { useRootNavigationState, useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigationState?.key) return;

    router.replace("/home");
  }, [rootNavigationState]);

  return null;
}
