import { View, Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";

export default function EmptyState({
  title,
  text,
  icon = "inbox",
}: {
  title: string;
  text?: string;
  icon?: React.ComponentProps<typeof Feather>["name"];
}) {
  return (
    <View className="items-center gap-2 rounded-2xl bg-white p-6">
      <View className="h-12 w-12 items-center justify-center rounded-full bg-background1">
        <Feather name={icon} size={22} color="#678fa2" />
      </View>
      <Text className="font-header text-base text-text3">{title}</Text>
      {text ? (
        <Text className="text-center font-body text-xs text-text1">{text}</Text>
      ) : null}
    </View>
  );
}
