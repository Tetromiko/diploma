import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function AuthorizationIndex() {
  const router = useRouter();

  useEffect(() => {
    router.push("/authorization/login");
  }, [router]);

  return null;
}
