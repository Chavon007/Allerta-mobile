import React from "react";
import { View, Text, Pressable } from "react-native";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "expo-router";

const Profile = () => {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const handleLogout = async () => {
    console.log("Logout pressed");

    await logout();
    router.replace("/login");

    console.log("Logout completed");
  };

  return (
    <View className="pt-20">
      <Pressable onPress={handleLogout}>
        <Text>Clear Session</Text>
      </Pressable>
    </View>
  );
};

export default Profile;
