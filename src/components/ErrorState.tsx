import { View, Text, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";

export default function ErrorState({
  message = "Something went wrong. Please try again.",
  onRetry,
}: { message?: string; onRetry?: () => void }) {
  return (
    <View className="items-center gap-3 rounded-2xl bg-white p-6">
      <View className="h-12 w-12 items-center justify-center rounded-full bg-emergencyLight">
        <Feather name="alert-circle" size={22} color="#D91E2A" />
      </View>
      <Text className="text-center font-bodyMedium text-sm text-text3">{message}</Text>
      {onRetry && (
        <Pressable onPress={onRetry} className="rounded-full bg-background px-5 py-2.5">
          <Text className="font-button text-xs text-white">Try again</Text>
        </Pressable>
      )}
    </View>
  );
}