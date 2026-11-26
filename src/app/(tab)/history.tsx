import React from "react";
import { Text, FlatList, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useGetUserAllEmergency } from "@/api/emergency";
import EmergencydetailCard from "@/components/emergencydetailCard";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";

const fmt = (d: string | null) =>
  d
    ? new Date(d).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    : "Ongoing";

const History = () => {
  const {
    data,
    isLoading,
    isError,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetUserAllEmergency();

  const items = data?.pages.flatMap((p) => p.data) ?? [];

  return (
    <SafeAreaView className="flex-1 bg-background1" edges={["top"]}>
      <StatusBar style="dark" />
      <FlatList
        data={items}
        keyExtractor={(e) => String(e.id)}
        contentContainerClassName="gap-4 px-4 pb-28 pt-3"
        showsVerticalScrollIndicator={false}
        refreshing={isRefetching}
        onRefresh={refetch}
        onEndReached={() =>
          hasNextPage && !isFetchingNextPage && fetchNextPage()
        }
        onEndReachedThreshold={0.4}
        ListHeaderComponent={
          <View className="gap-4">
            <View className="gap-1">
              <Text className="font-header text-3xl text-text3">History</Text>
              <Text className="font-body text-sm text-backgroundLight">
                Every emergency session is recorded for your records
              </Text>
            </View>
            <Text className="font-headerMedium text-[11px] uppercase tracking-widest text-backgroundLight">
              Emergency sessions
            </Text>
          </View>
        }
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator />
          ) : isError ? (
            <ErrorState
              message="Couldn't load your history."
              onRetry={refetch}
            />
          ) : (
            <EmptyState
              icon="clock"
              title="No emergencies yet"
              text="Your past emergency sessions will show here."
            />
          )
        }
        ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator /> : undefined
        }
        renderItem={({ item }) => (
          <EmergencydetailCard
            index={item.id}
            date={item.started_at}
            started={fmt(item.started_at)}
            ended={fmt(item.ended_at)}
            address={item.latest_address ?? "Address not available"}
            status={item.status}
            fullName={
              item.recipients
                ?.map((r) => r.contact?.full_name)
                .filter((n): n is string => !!n) ?? []
            }
          />
        )}
      />
    </SafeAreaView>
  );
};

export default History;
