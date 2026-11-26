import { View, Text } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

export default function OfflineBanner() {
  const { isConnected } = useNetInfo();
  if (isConnected !== false) return null;
  return (
    <View className="bg-text3 px-4 py-2">
      <Text className="text-center font-bodyMedium text-xs text-white">
        No internet. Location sharing may be delayed.
      </Text>
    </View>
  );
}