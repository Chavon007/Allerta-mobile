import React from "react";
import EmergencyButton from "@/components/EmergencyButton";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useAuthStore } from "@/store/authStore";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
  SimpleLineIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { Link } from "expo-router";

const contact = [
  {
    text: "JA",
    name: "John",
  },
  {
    text: "MA",
    name: "Michael",
  },
];

const items = [
  {
    type: "journey",
    title: "Lekki phase 1, Lagos",
    subtitle: "25 September 2026 8:29 AM - 8:30 AM",
    status: "Ended",
    icon: "location-pin",
    iconLibrary: "SimpleLineIcons",
    iconColor: "#3d7a9a",
  },
  {
    type: "safety",
    title: "Safety Journey",
    subtitle: "Share an ETA on Your way home",
    status: "V2",
    icon: "location-arrow",
    iconLibrary: "FontAwesome",
    iconColor: "black",
    href: "/",
  },
  {
    type: "recipient",
    title: "Recipient preview",
    subtitle: "See what your contact shared with you",
    icon: "bell-ring-outline",
    iconLibrary: "MaterialCommunityIcons",
    iconColor: "#3d7a9a",
    href: "/",
  },
];

const Home = () => {
  const user = useAuthStore((state) => state.user);

  const time = new Date().getHours();

  let greetings;

  if (time < 12) {
    greetings = "Good morning";
  } else if (time < 16) {
    greetings = "Good afternoon";
  } else {
    greetings = "Good evening";
  }

  return (
    <SafeAreaView className="flex-1 bg-background1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-5 pt-4 pb-28"
      >
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="font-body text-xs text-text3">{greetings}</Text>

            <Text className="mt-1 font-headerMedium text-3xl text-text3">
              {user?.full_name?.split(" ")[0]}
            </Text>
          </View>

          <View className="h-12 w-12 items-center justify-center rounded-full bg-[#ddeef8]">
            <Text className="font-headerMedium text-base text-background">
              {user?.full_name
                ?.split(" ")
                .slice(0, 2)
                .map((name) => name[0])
                .join("")
                .toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Safety Status */}
        <View className="mt-4 self-start flex-row items-center gap-1 rounded-full bg-green-100 px-3 py-2">
          <MaterialCommunityIcons
            name="shield-check-outline"
            size={14}
            color="#22c55e"
          />

          <Text className="font-bodyMedium text-xs text-green-500">
            You're safe
          </Text>
        </View>

        {/* Emergency Button */}
        <View className="mt-7">
          <EmergencyButton />
        </View>

        {/* Trusted Circle */}
        <View className="mt-8">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="font-headerMedium text-lg text-text3">
              Trusted circle
            </Text>

            <Link href="/(tab)/contact" asChild>
              <Pressable>
                <Text className="font-bodyMedium text-sm text-background">
                  Manage
                </Text>
              </Pressable>
            </Link>
          </View>

          <View className="rounded-2xl border border-[#e3eaf0] bg-white p-4">
            {/* Circle Summary */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-background">
                  <Ionicons name="people-outline" size={18} color="white" />
                </View>

                <View>
                  <Text className="font-bodyMedium text-sm text-text3">
                    2 emergency contacts
                  </Text>

                  <Text className="mt-1 font-body text-xs text-text1">
                    2/3 slots used
                  </Text>
                </View>
              </View>

              <View className="rounded-full bg-green-100 px-3 py-1.5">
                <Text className="font-bodyMedium text-xs text-green-500">
                  Ready
                </Text>
              </View>
            </View>

            {/* Contacts */}
            <View className="mt-5 flex-row items-center">
              {contact.map((c) => (
                <View key={c.name} className="mr-4 flex-row items-center gap-2">
                  <View className="h-9 w-9 items-center justify-center rounded-full bg-[#ddeef8]">
                    <Text className="font-headerMedium text-xs text-background">
                      {c.text}
                    </Text>
                  </View>

                  <Text className="font-bodyMedium text-xs text-text3">
                    {c.name}
                  </Text>
                </View>
              ))}

              <Link href="/(tab)/contact" asChild>
                <Pressable className="ml-auto h-9 w-9 items-center justify-center rounded-full border border-[#dce5ec]">
                  <AntDesign name="plus" size={18} color="#1e5975" />
                </Pressable>
              </Link>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        {/* Recent Activity */}
        <View className="mt-8">
          <Text className="mb-3 font-headerMedium text-lg text-text3">
            Recent activity
          </Text>

          <View className="gap-3">
            {items.map((item, index) => {
              const isJourney = item.type === "journey";
              const isRecipient = item.type === "recipient";

              const iconBackground = isJourney
                ? "bg-red-100"
                : isRecipient
                  ? "bg-orange-100"
                  : "bg-[#edf5f9]";

              const iconColor = isJourney
                ? "#ef4444"
                : isRecipient
                  ? "#404a54"
                  : "#1e5975";

              const content = (
                <View className="flex-row items-center rounded-2xl border border-[#e3eaf0] bg-white p-4">
                  {/* Icon */}
                  <View
                    className={`h-11 w-11 items-center justify-center rounded-xl ${iconBackground}`}
                  >
                    {item.iconLibrary === "SimpleLineIcons" && (
                      <SimpleLineIcons
                        name={item.icon as any}
                        size={22}
                        color={iconColor}
                      />
                    )}

                    {item.iconLibrary === "FontAwesome" && (
                      <FontAwesome
                        name={item.icon as any}
                        size={20}
                        color={iconColor}
                      />
                    )}

                    {item.iconLibrary === "MaterialCommunityIcons" && (
                      <MaterialCommunityIcons
                        name={item.icon as any}
                        size={22}
                        color={iconColor}
                      />
                    )}
                  </View>

                  {/* Content */}
                  <View className="ml-3 flex-1">
                    <Text className="font-bodyMedium text-sm text-text3">
                      {item.title}
                    </Text>

                    <Text
                      numberOfLines={1}
                      className="mt-1 font-body text-xs text-text1"
                    >
                      {item.subtitle}
                    </Text>
                  </View>

                  {/* Status */}
                  {item.status && (
                    <View className="ml-2 rounded-full bg-[#edf5f9] px-2.5 py-1">
                      <Text className="font-bodyMedium text-[10px] text-background">
                        {item.status}
                      </Text>
                    </View>
                  )}
                </View>
              );

              return item.href ? (
                <Link key={index} href={item.href as any} asChild>
                  <Pressable>{content}</Pressable>
                </Link>
              ) : (
                <View key={index}>{content}</View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
