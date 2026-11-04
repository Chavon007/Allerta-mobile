import { View, Text } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
interface locationCardProp {
  address: string;
  contact: number;
  time: string;
}
function LocationUpdateCard({ address, contact, time }: locationCardProp) {
  const rows: {
    icon: React.ComponentProps<typeof Feather>["name"];
    label: string;
    value: string;
  }[] = [
    { icon: "map-pin", label: "Current address", value: address },
    {
      icon: "radio",
      label: "Location status",
      value: "Live location updating",
    },
    { icon: "clock", label: "Last update", value: time },
    {
      icon: "bell",
      label: "Notifications",
      value: `${contact} contacts notified`,
    },
  ];
  return (
    <View className="rounded-2xl bg-white px-4">
      {rows.map((r, i) => (
        <View
          key={r.label}
          className={`flex-row items-center gap-3 py-3 ${
            i !== rows.length - 1 ? "border-b border-gray-100" : ""
          }`}
        >
          <Feather name={r.icon} size={16} color="#3d7a9a" />
          <View className="flex-1">
            <Text className="font-body text-[10px] uppercase tracking-wide text-text1">
              {r.label}
            </Text>
            <Text className="font-bodyMedium text-sm text-black/70">
              {r.value}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

export default LocationUpdateCard;
