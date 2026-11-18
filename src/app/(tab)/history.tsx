import React from "react";
import { Text, View, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useGetUserAllEmergency } from "@/api/emergency";
import EmergencydetailCard from "@/components/emergencydetailCard";

const fmt = (d: string | null) =>
  d
    ? new Date(d).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    : "Ongoing";

const History = () => {
  const { data = [], isLoading } = useGetUserAllEmergency();

  return (
    <SafeAreaView className="flex-1 bg-background1" edges={["top"]}>
      <StatusBar style="dark" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 px-4 pb-8 pt-3"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-1">
          <Text className="font-header text-3xl text-text3">History</Text>
          <Text className="font-body text-sm text-text1">
            Every emergency session is recorded for your records
          </Text>
        </View>

        <Text className="font-bodyMedium text-[10px] uppercase tracking-wider text-text1">
          Emergency sessions
        </Text>

        {isLoading && <ActivityIndicator />}

        {!isLoading && data.length === 0 && (
          <View className="items-center rounded-2xl bg-white p-6">
            <Text className="font-bodyMedium text-sm text-text1">
              No emergencies yet.
            </Text>
          </View>
        )}

        {data.map((e) => (
          <EmergencydetailCard
            key={e.id}
            date={e.started_at}
            started={fmt(e.started_at)}
            ended={fmt(e.ended_at)}
            address={e.latest_address ?? "Address not available"}
            status={e.status}
            fullName={
              e.recipients
                ?.map((r) => r.contact?.full_name)
                .filter((n): n is string => !!n) ?? []
            }
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default History;