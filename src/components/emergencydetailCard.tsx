import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";
import Feather from "@expo/vector-icons/Feather";

export type statusProps = "active" | "ended";

interface EmergencyDetailProps {
  date: string;
  started: string;
  ended: string;
  address: string;
  status: statusProps;
  fullName: string[];
}

const EmergencydetailCard = (data: EmergencyDetailProps) => {
  const [open, setOpen] = useState(false);
  const mainDate = new Date(data.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const isActive = data.status === "active";

  return (
    <View className="overflow-hidden rounded-2xl bg-white">
      <Pressable
        onPress={() => setOpen((v) => !v)}
        className="flex-row items-start gap-3 p-4"
      >
        <View className="h-10 w-10 items-center justify-center rounded-full bg-background1">
          <Feather name="map-pin" size={18} color="#678fa2" />
        </View>

        <View className="flex-1">
          <Text className="font-header text-base text-text3">{mainDate}</Text>
          <Text className="mt-0.5 font-body text-xs text-text1">
            {data.started} - {data.ended}
          </Text>
          <Text className="font-body text-xs text-text1">{data.address}</Text>
        </View>

        <View className="flex-row items-center gap-2">
          <View
            className={`rounded-full px-2.5 py-1 ${
              isActive ? "bg-emergencyLight" : "bg-gray-100"
            }`}
          >
            <Text
              className={`font-bodyMedium text-[10px] capitalize ${
                isActive ? "text-emergency" : "text-text1"
              }`}
            >
              {data.status}
            </Text>
          </View>
          <Feather
            name={open ? "chevron-up" : "chevron-down"}
            size={18}
            color="#678fa2"
          />
        </View>
      </Pressable>

      {open && (
        <View className="gap-3 border-t border-gray-200 p-4">
          <View className="h-32 overflow-hidden rounded-xl bg-background1">
            <Image
              source={require("../../assets/images/map.avif")}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />

            <View className="absolute left-1/2 top-1/3 -ml-4 h-8 w-8 items-center justify-center rounded-full bg-background">
              <Feather name="map-pin" size={14} color="#fff" />
            </View>

            <View className="absolute bottom-2 left-2 right-2 flex-row items-center gap-2 rounded-xl bg-white px-3 py-2">
              <View className="h-1.5 w-1.5 rounded-full bg-emergency" />
              <View className="flex-1">
                <Text className="font-body text-[9px] uppercase tracking-wide text-text1">
                  Location at the time
                </Text>
                <Text className="font-bodyMedium text-xs text-text3">
                  {data.address}
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-row items-start gap-2">
            <Feather name="clock" size={14} color="#678fa2" />
            <Text className="flex-1 font-body text-xs text-text3">
              Session lasted {data.started} to {data.ended}.{" "}
              {isActive
                ? "Live location is still being shared."
                : "Live location sharing stopped when the emergency ended."}
            </Text>
          </View>

          <View className="flex-row items-start gap-2">
            <Feather name="users" size={14} color="#678fa2" />
            <Text className="flex-1 font-body text-xs text-text3">
              Notified:
              {data.fullName.length ? data.fullName.join(", ") : "No one"}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default EmergencydetailCard;