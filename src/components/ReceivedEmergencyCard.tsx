import { Text, View, Pressable } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface ReceivedEmergencyCardProp {
  name: string;
  address?: string | null;
  startedAt: string;
  onPress: () => void;
}

function ReceivedEmergencyCard({
  name,
  address,
  startedAt,
  onPress,
}: ReceivedEmergencyCardProp) {
  const firstName = name.trim().split(" ")[0];
  const initials = name
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const time = new Date(startedAt).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <Pressable
      onPress={onPress}
      className="mx-auto w-[90%] overflow-hidden rounded-3xl border-l-4 border-emergency bg-white active:opacity-80"
    >
      <View className="gap-3 p-4">
        <View className="flex-row items-center gap-3">
          <View className="h-12 w-12 items-center justify-center rounded-full bg-emergencyLight">
            <Text className="font-header text-base text-emergency">
              {initials}
            </Text>
          </View>

          <View className="flex-1">
            <View className="flex-row items-center gap-1.5">
              <MaterialCommunityIcons
                name="shield-alert-outline"
                size={14}
                color="#D91E2A"
              />
              <Text className="font-headerMedium text-[10px] uppercase tracking-wider text-emergency">
                Emergency alert
              </Text>
            </View>
            <Text
              numberOfLines={1}
              className="mt-0.5 font-header text-lg text-text3"
            >
              {firstName} needs your help
            </Text>
          </View>

          <Feather name="arrow-right" size={20} color="#1e5975" />
        </View>

        <View className="gap-1.5 rounded-2xl bg-background1 p-3">
          <View className="flex-row items-center gap-2">
            <Feather name="map-pin" size={13} color="#3d7a9a" />
            <Text
              numberOfLines={1}
              className="flex-1 font-bodyMedium text-xs text-text3"
            >
              {address ?? "Live location available"}
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Feather name="clock" size={13} color="#3d7a9a" />
            <Text className="font-body text-xs text-text1">Started {time}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default ReceivedEmergencyCard;
