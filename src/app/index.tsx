import { Redirect } from "expo-router";
import { useAuthStore } from "@/store/authStore";

export default function Index() {
  const { isLoading, isLoggedIn } = useAuthStore();

  if (isLoading) return null;
  if (!isLoggedIn) return <Redirect href="/onboarding" />;
  return <Redirect href="/(tab)/home" />;
}
