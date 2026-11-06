import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
import ContactStatusCard from "@/components/contactStatusCard";
import LocationUpdateCard from "@/components/locationUpdateCard";
import LocationMap from "@/components/LocationMap";
import { seedAlert } from "@/data/seedAlert";
import { BackHandler } from "react-native";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { useEndEmergency } from "@/api/emergency";
import { useEmergencyState } from "@/store/emergencyStore";
import { useWatchLocation } from "@/hooks/useLocation";
import { useSendLocation } from "@/api/emergency";
export default function AlertActive() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { mutate, isPending } = useEndEmergency();
  const { mutate: sendLocation } = useSendLocation();
  const emergencyId = useEmergencyState((s) => s.emergencyId);
  const setEmergencyId = useEmergencyState((s) => s.setEmergencyId);
  useFocusEffect(
    useCallback(() => {
      const sub = BackHandler.addEventListener("hardwareBackPress", () => true);
      return () => sub.remove();
    }, []),
  );
  const notified = seedAlert.contacts.filter(
    (c) => c.status !== "Unnotified",
  ).length;

  useWatchLocation(emergencyId !== null, (coords) => {
    if (emergencyId !== null) sendLocation({ id: emergencyId, ...coords });
  });
  const onEnd = () => {
    if (emergencyId === null || isPending) return;
    mutate(emergencyId, {
      onSuccess: () => {
        setEmergencyId(null);
        router.replace("/");
      },
    });
  };
  return (
    // Background lives on SafeAreaView so the status bar area is pink too
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
            Help is being notified
          </Text>
          <Text className="mt-1 font-bodyMedium text-sm text-text1/90">
            Started {seedAlert.startedAt} · your live location is being shared
            with your trusted circle.
          </Text>
        </View>

        <LocationMap address={seedAlert.address} coords={seedAlert.coords} />

        <LocationUpdateCard
          address={seedAlert.address}
          time={seedAlert.startedAt}
          contact={notified}
        />

        <ContactStatusCard contacts={[...seedAlert.contacts]} />
      </ScrollView>

      <View
        className="items-center justify-center rounded-t-lg h-[20vh] bg-background1 px-4 pt-4"
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}
      >
        <Button
          className="bg-red-500"
          textClassName="text-white"
          onPress={onEnd}
          disabled={isPending}
        >
          {isPending ? (
            <Text>
              <ActivityIndicator />
              ENDING...
            </Text>
          ) : (
            "END EMERGENCY"
          )}
        </Button>
        <Text className="mt-2 text-center font-body text-sm text-text1">
          Ending stops live location sharing immediately
        </Text>
      </View>
    </SafeAreaView>
  );
}
