import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter, useFocusEffect } from "expo-router";
import { BackHandler } from "react-native";
import { useCallback } from "react";
import Button from "@/components/Button";
import ContactStatusCard from "@/components/contactStatusCard";
import LocationUpdateCard from "@/components/locationUpdateCard";
import LocationMap from "@/components/LocationMap";
import {
  useEndEmergency,
  useSendLocation,
  useGetEmergency,
  useFetchContact,
} from "@/api/emergency";
import { useEmergencyState } from "@/store/emergencyStore";
import { useWatchLocation } from "@/hooks/useLocation";
import { Coords, getCurrentCoords } from "@/hooks/useLocation";
import { useLocalAddress } from "@/hooks/useLocalAddress";
import { useEffect, useState } from "react";
export default function AlertActive() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const emergencyId = useEmergencyState((s) => s.emergencyId);
  const setEmergencyId = useEmergencyState((s) => s.setEmergencyId);

  const { mutate: end, isPending } = useEndEmergency();
  const { mutate: sendLocation } = useSendLocation();
  const { data: emergency, error, status } = useGetEmergency(emergencyId, 5000);
  const [localCoords, setLocalCoords] = useState<Coords | null>(null);
  const { data: contacts = [] } = useFetchContact();

  useFocusEffect(
    useCallback(() => {
      const sub = BackHandler.addEventListener("hardwareBackPress", () => true);
      return () => sub.remove();
    }, []),
  );

  useWatchLocation(emergencyId !== null, (coords) => {
    if (emergencyId !== null) sendLocation({ id: emergencyId, ...coords });
  });

  const hasLocation =
    emergency?.latest_latitude != null && emergency?.latest_longitude != null;

  const startedAt = emergency
    ? new Date(emergency.started_at).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      })
    : "--";

  const lastUpdate = emergency
    ? new Date(emergency.updated_at).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      })
    : "--";

  const onEnd = () => {
    if (emergencyId === null || isPending) return;
    end(emergencyId, {
      onSuccess: () => {
        setEmergencyId(null);
        router.replace("/");
      },
    });
  };

  useEffect(() => {
    getCurrentCoords()
      .then(setLocalCoords)
      .catch(() => {});
  }, []);

  const coords: Coords | null = hasLocation
    ? {
        latitude: Number(emergency!.latest_latitude),
        longitude: Number(emergency!.latest_longitude),
      }
    : localCoords;

  const localAddress = useLocalAddress(coords);

  const address =
    emergency?.latest_address ?? localAddress ?? "Finding your address...";
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
            Help is being notified
          </Text>
          <Text className="mt-1 font-bodyMedium text-sm text-text1/90">
            Started {startedAt} · your live location is being shared with your
            trusted circle.
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
          contact={contacts.length}
        />

        <ContactStatusCard
          contacts={contacts.map((c: any) => ({
            id: String(c.id),
            fullName: c.full_name ?? c.fullName ?? c.name,
            status: "Notified" as const, // placeholder, see note below
          }))}
        />
      </ScrollView>

      <View
        className="items-center justify-center rounded-t-lg bg-background1 px-4 pt-4"
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}
      >
        <Button
          className="bg-red-500"
          textClassName="text-white"
          onPress={onEnd}
          disabled={isPending || emergencyId === null}
        >
          {isPending ? (
            <View className="flex-row items-center gap-2">
              <ActivityIndicator />
              <Text className="text-white">ENDING...</Text>
            </View>
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
