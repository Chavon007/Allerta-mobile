import { View, Text } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { getStaleness } from "@/utils/staleness";
import { useNow } from "@/hooks/useNow";
interface locationCardProp {
  address: string;
  contact?: number;
  time: string;
  full_name?: string;
  username?: string;
  updatedAt?: string | null;
}

function LocationUpdateCard({
  address,
  contact,
  time,
  username,
  full_name,
  updatedAt,
}: locationCardProp) {
  const now = useNow();
  const stale = getStaleness(updatedAt, now);

  const statusValue =
    stale.level === "live"
      ? "Live location updating"
      : stale.level === "warning"
        ? `Last updated ${stale.label}`
        : `Location may be outdated. Last updated ${stale.label}`;

  const statusColor =
    stale.level === "live"
      ? "#3d7a9a"
      : stale.level === "warning"
        ? "#D97706"
        : "#D91E2A";
  const rows: {
    icon: React.ComponentProps<typeof Feather>["name"];
    label: string;
    value: string;
    color?: string;
  }[] = [
    { icon: "map-pin", label: "Current address", value: address },
    {
      icon: "radio",
      label: "Location status",
      value: statusValue,
      color: statusColor,
    },
    { icon: "clock", label: "Last update", value: time },
  ];

  if (contact !== undefined) {
    rows.push({
      icon: "bell",
      label: "Notifications",
      value: `${contact} ${contact === 1 ? "contact" : "contacts"} notified`,
    });
  }

  const initial = (full_name ?? "")
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <View className="rounded-2xl bg-white px-4">
      {full_name ? (
        <View className="flex-row items-center gap-3 border-b border-gray-100 py-4">
          <View className="h-11 w-11 items-center justify-center rounded-full bg-emergencyLight">
            <Text className="font-header text-base text-emergency">
              {initial}
            </Text>
          </View>

          <View className="flex-1">
            <Text className="font-header text-base text-text3">
              {full_name}
            </Text>
            {username ? (
              <Text className="font-body text-xs text-text1">@{username}</Text>
            ) : null}
          </View>

          <View className="flex-row items-center gap-1.5 rounded-full bg-emergencyLight px-2.5 py-1">
            <View className="h-1.5 w-1.5 rounded-full bg-emergency" />
            <Text className="font-bodyMedium text-[10px] uppercase tracking-wider text-emergency">
              Live
            </Text>
          </View>
        </View>
      ) : null}

      {rows.map((r, i) => (
        <View
          key={r.label}
          className={`flex-row items-center gap-3 py-3 ${
            i !== rows.length - 1 ? "border-b border-gray-100" : ""
          }`}
        >
          <Feather name={r.icon} size={16} color={r.color ?? "#3d7a9a"} />
          <View className="flex-1">
            <Text className="font-body text-[10px] uppercase tracking-wide text-text1">
              {r.label}
            </Text>
            <Text
              className="font-bodyMedium text-sm text-black/70"
              style={
                r.color && r.color !== "#3d7a9a"
                  ? { color: r.color }
                  : undefined
              }
            >
              {r.value}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

export default LocationUpdateCard;
