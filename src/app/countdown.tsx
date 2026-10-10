import { View, Text, Animated, Easing, Pressable } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Countdown() {
  const [count, setCount] = useState(5);
  const router = useRouter();
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  const ringScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.6],
  });

  const ringOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0],
  });

  useEffect(() => {
    if (count === 0) {
      router.replace("/");
      return;
    }
    const timer = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [count]);

  return (
    <SafeAreaView className="flex-1 bg-red-100">
      <View className="flex-1 w-[90%] mx-auto justify-between py-6">
        {/* Top text */}
        <View className="items-center gap-3 mt-10">
          <View className="flex-row items-center gap-1">
            <MaterialCommunityIcons
              name="shield-alert-outline"
              size={13}
              color="#dc2626"
            />

            <Text className="text-red-600 text-base font-bodyMedium">
              Activating emergency
            </Text>
          </View>
          <Text className="text-text3 text-3xl font-header text-center">
            Alerting your people in
          </Text>
          <Text className="text-text3/70 text-xs font-body text-center">
            Tap cancel if you pressed this by accident.
          </Text>
        </View>

        {/* Countdown circle */}
        <View className="items-center justify-center">
          <View className="w-[260px] h-[260px] items-center justify-center">
            {/* Pulsing outer ring */}
            <Animated.View
              className="absolute w-[180px] h-[180px] rounded-full bg-red-300"
              style={{
                opacity: ringOpacity,
                transform: [{ scale: ringScale }],
              }}
            />
            {/* Static thin ring */}
            <View className="absolute w-[220px] h-[220px] rounded-full border border-red-300" />
            {/* Main circle */}
            <View className="w-[180px] h-[180px] rounded-full bg-red-600 items-center justify-center">
              <Text className="text-text text-7xl font-header">{count}</Text>
            </View>
          </View>
        </View>

        {/* Buttons */}
        <View className="gap-3">
          <Pressable
            onPress={() => router.back()}
            className="flex-row items-center justify-center gap-2 bg-white rounded-2xl py-4 active:opacity-80"
          >
            <Ionicons name="close" size={16} color="#404a54" />
            <Text className="text-text3 font-button text-sm">Cancel</Text>
          </Pressable>

          <Pressable
            onPress={() => router.replace("/")}
            className="items-center justify-center bg-red-600 rounded-2xl py-4 active:opacity-80 shadow-lg shadow-red-400"
          >
            <Text className="text-text font-button text-sm">Alert now</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
