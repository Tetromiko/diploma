import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function AuthorizationIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return null;
}
