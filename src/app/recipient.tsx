import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRecieveEmergency } from "@/api/emergency";
import ReceivedEmergencyCard from "@/components/ReceivedEmergencyCard";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";

const Recipient = () => {
  const router = useRouter();
  const name = useAuthStore((n) => n.user?.full_name);
  const { data: list = [], isLoading, isError, refetch } = useRecieveEmergency();

  const firstName = name?.trim().split(" ")[0];
  const count = list.length;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 py-8">
        <Text className="text-center font-header text-sm uppercase text-text">
          Connected contact · {firstName}'s phone
        </Text>

        {count > 0 && (
          <Text className="mt-6 text-center font-header text-2xl text-text">
            {count} {count === 1 ? "person needs" : "people need"} your help
          </Text>
        )}

        <View className="flex-1 justify-center">
          {isLoading ? (
            <ActivityIndicator size="large" color="#eef2f6" />
          ) : isError && count === 0 ? (
            <View className="mx-auto w-[90%]">
              <ErrorState
                message="Couldn't check for alerts."
                onRetry={refetch}
              />
            </View>
          ) : count > 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerClassName="gap-3 py-6"
            >
              {list.map((e) => (
                <ReceivedEmergencyCard
                  key={e.id}
                  name={e.user?.full_name ?? "Someone"}
                  address={e.latest_address}
                  startedAt={e.started_at}
                  onPress={() =>
                    router.push({
                      pathname: "/seeAlert",
                      params: { id: String(e.id) },
                    })
                  }
                />
              ))}
            </ScrollView>
          ) : (
            <View className="mx-auto w-[90%]">
              <EmptyState
                icon="shield"
                title="No active emergency"
                text="When someone in your circle needs help, it will show here."
              />
            </View>
          )}
        </View>

        <View className="items-center gap-4">
          {count > 0 && (
            <Text className="font-headerMedium text-sm text-text">
              Tap an alert to open it.
            </Text>
          )}

          <Link href="/(tab)/home" asChild>
            <Pressable>
              <Text className="font-button text-xs italic text-text underline">
                Back to Allerta
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Recipient;