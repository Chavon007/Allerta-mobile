import React, { useEffect, useRef } from "react";
import { View, Text, Pressable, Animated, Easing } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const EmergencyButton = () => {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      })
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
    outputRange: [0.5, 0],
  });

  return (
    <View className="bg-white mt-5 w-[95%] mx-auto h-[300px] rounded-[40px] justify-center items-center">
      <View className="w-[180px] h-[180px] justify-center items-center">
        {/* Pulsing ring */}
        <Animated.View
          className="absolute w-[180px] h-[180px] rounded-full bg-red-400"
          style={{
            opacity: ringOpacity,
            transform: [{ scale: ringScale }],
          }}
        />

        {/* Static solid button */}
        <Pressable className="bg-red-600 w-[180px] h-[180px] rounded-full justify-center items-center active:opacity-80">
          <MaterialCommunityIcons name="shield-alert-outline" size={32} color="white" />
          <Text className="text-white font-header text-xl font-bold mt-2">
            EMERGENCY
          </Text>
          <Text className="text-white font-body text-xs mt-1">
            Press to alert
          </Text>
        </Pressable>
      </View>

      <Text className="text-text3 font-body text-xs text-center mt-4 px-6">
        You'll get 5 seconds to cancel before your 2 contacts are notified.
      </Text>
    </View>
  );
};

export default EmergencyButton;