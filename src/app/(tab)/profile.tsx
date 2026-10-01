import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "@/store/authStore";
import { Link, useRouter } from "expo-router";
import {
  Feather,
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { useState } from "react";
import { ro } from "zod/v4/locales";

interface safetySectionProps {
  icon: string;
  text: string;
  description: string;
  iconLibrary: "Ionicons" | "MaterialCommunityIcons";
  link?: string;
}

const safetySection: safetySectionProps[] = [
  {
    icon: "people-outline",
    text: "Emergency contacts",
    description: "",
    iconLibrary: "Ionicons",
    link: "/(tab)/contact",
  },
  {
    icon: "credit-card-outline",
    text: "Contact slots & plan",
    description: "Free plan. 3 contacts included",
    iconLibrary: "MaterialCommunityIcons",
    link: "/",
  },
  {
    icon: "shield-check-outline",
    text: "Privacy",
    description: "How and when your location is shared",
    iconLibrary: "MaterialCommunityIcons",
  },
];

const Profile = () => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const [openPrivacy, setOpenPrivacy] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    console.log("Logout pressed");

    await logout();
    router.replace("/login");

    console.log("Logout completed");
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="pt-20">
          <Text>Profile</Text>

          <View>
            <Text>
              {user?.full_name
                ?.split(" ")
                .slice(0, 2)
                .map((name) => name[0])
                .join("")
                .toUpperCase()}
            </Text>

            <View>
              <Text>{user?.full_name}</Text>
              <Text>
                {user?.email} . {user?.username}
              </Text>
            </View>

            <Link href="/(tab)/contact" asChild>
              <Pressable>
                <Feather name="edit-2" size={24} color="black" />
              </Pressable>
            </Link>
          </View>

          <View>
            <Text>Safety</Text>
            <View>
              {safetySection.map((s, index) => {
                const row = (
                  <Pressable
                    {...(!s.link && { onPress: () => setOpenPrivacy(true) })}
                  >
                    {s.iconLibrary === "Ionicons" && (
                      <Ionicons name={s.icon as any} size={22} />
                    )}
                    {s.iconLibrary === "MaterialCommunityIcons" && (
                      <MaterialCommunityIcons name={s.icon as any} size={22} />
                    )}
                    <View>
                      <Text>{s.text}</Text>
                      <Text>{s.description}</Text>
                    </View>
                  </Pressable>
                );
                return s.link ? (
                  <Link key={index} href={s.link as any} asChild>
                    {row}
                  </Link>
                ) : (
                  <View key={index}>{row}</View>
                );
              })}
            </View>
          </View>
          <Pressable onPress={handleLogout}>
            <Text>Clear Session</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
