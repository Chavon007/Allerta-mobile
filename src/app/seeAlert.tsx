import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React from "react";
import Toast from "react-native-toast-message";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Button from "@/components/Button";
import { Linking } from "react-native";
import * as Clipboard from "expo-clipboard";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import LocationUpdateCard from "@/components/locationUpdateCard";
import LocationMap from "@/components/LocationMap";
import {
  useRecieveEmergency,
  useRespondEmergency,
  useGetEmergency,
} from "@/api/emergency";
export default function seeAlert() {
  const insets = useSafeAreaInsets();
  const [notified, setNotified] = useState(false);
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { data: list = [] } = useRecieveEmergency();
  const { mutate, isPending } = useRespondEmergency();

  const emergencyId = id ? Number(id) : (list[0]?.id ?? null);
  const received = list.find((e) => e.id === emergencyId);
  const { data: live } = useGetEmergency(emergencyId, 5000);

  const current = live ?? received;

  const fullName = received?.user.full_name ?? "Someone";
  const firstName = fullName.trim().split(" ")[0];
  const coords =
    current?.latest_latitude != null && current?.latest_longitude != null
      ? {
          latitude: Number(current.latest_latitude),
          longitude: Number(current.latest_longitude),
        }
      : null;

  const lastUpdate = current?.updated_at
    ? new Date(current.updated_at).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      })
    : "--";

  const address = current?.latest_address ?? "Live location available";
  const onSubmit = () => {
    if (emergencyId === null) return;
    mutate(
      {
        id: emergencyId,
        name: firstName,
      },
      { onSuccess: () => setNotified(true) },
    );
  };

  const openMaps = () => {
    if (!coords) return;
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${coords.latitude},${coords.longitude}`,
    );
  };

  const copyCoords = async () => {
    if (!coords) return;

    await Clipboard.setStringAsync(`${coords.latitude}, ${coords.longitude}`);
    Toast.show({ type: "success", text1: "Coordinates copied" });
  };
  return (
    <SafeAreaView className="flex-1 bg-emergencyLight" edges={["top"]}>
      <StatusBar style="dark" />

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 px-4 pb-4 pt-3"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-1">
          <View className="mb-2 flex-row items-center gap-1.5">
            <View className="h-2 w-2 rounded-full bg-emergency" />
            <Text className="font-bodyMedium text-[10px] uppercase tracking-wider text-emergency">
              Emergency alert active
            </Text>
          </View>
          <Text className="font-header text-3xl text-black">
            {firstName} needs your help
          </Text>
          <Text className="mt-1 font-bodyMedium text-sm text-text1/90">
            You were added as a trusted contact. Their live location is shared
            with you until the emergency ends.
          </Text>
        </View>

        {coords ? (
          <LocationMap address={address} coords={coords} />
        ) : (
          <View className="h-64 items-center justify-center rounded-2xl bg-white">
            <ActivityIndicator />
          </View>
        )}

        <LocationUpdateCard
          address={address}
          time={lastUpdate}
          full_name={fullName}
          username={received?.user?.username}
        />

        <View className="gap-3">
          <Button
            className="bg-white"
            textClassName="text-text3"
            onPress={openMaps}
            disabled={!coords}
          >
            <View className="flex-row items-center gap-2">
              <Feather name="navigation" size={20} color="#404a54" />
              <Text className="font-button text-base text-text3">
                Open on Google Maps
              </Text>
            </View>
          </Button>

          <Button
            className="bg-white"
            textClassName="text-text3"
            onPress={copyCoords}
            disabled={!coords}
          >
            <View className="flex-row items-center gap-2">
              <AntDesign name="copy" size={20} color="#404a54" />
              <Text className="font-button text-base text-text3">
                Copy Coordinates
              </Text>
            </View>
          </Button>
        </View>

        <Text className="text-center font-body text-xs text-text1">
          Allerta is a trusted-contact safety layer. For police, ambulance or
          fire, contact official emergency services.
        </Text>
      </ScrollView>

      <View
        className="items-center justify-center rounded-t-lg bg-background1 px-4 pt-4"
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}
      >
        {!notified ? (
          <Button
            className="bg-green-600"
            textClassName="text-white"
            onPress={onSubmit}
            disabled={isPending || emergencyId === null}
          >
            {isPending ? (
              <View className="flex-row items-center gap-2">
                <ActivityIndicator color="#fff" />
                <Text className="text-white">SENDING...</Text>
              </View>
            ) : (
              <View className="flex-row items-center gap-2">
                <Ionicons name="notifications-outline" size={20} color="#fff" />
                <Text className="font-button text-base text-white">
                  I'M ON MY WAY
                </Text>
              </View>
            )}
          </Button>
        ) : (
          <View className="flex-row items-center gap-2 py-3">
            <AntDesign name="check-circle" size={20} color="#16A34A" />
            <Text className="font-bodyMedium text-sm text-green-700">
              You've told {firstName} you're on your way
            </Text>
          </View>
        )}
        <Text className="mt-2 text-center font-body text-sm text-text1">
          {firstName} will be notified immediately
        </Text>
      </View>
    </SafeAreaView>
  );
}
