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
    <View>
      {rows.map((r) => (
        <View key={r.label}>
          <Feather name={r.icon} size={24} color="black" />
          <View>
            <Text>{r.label}</Text>
            <Text>{r.value}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

export default LocationUpdateCard;
