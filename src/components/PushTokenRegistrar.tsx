import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import {
  registerPushToken,
  listenForTokenRefresh,
} from "@/notifications/pushToken";

export default function PushTokenRegistrar() {
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    if (!token) return;

    registerPushToken();
    const unsubscribe = listenForTokenRefresh();

    return unsubscribe;
  }, [token]);

  return null;
}