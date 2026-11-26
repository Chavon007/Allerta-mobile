import React, { useEffect, useRef } from "react";
import { View, Text, Pressable, Animated, Easing } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEmergencyState } from "@/store/emergencyStore";
import { useGetActiveEmergency, useFetchContact } from "@/api/emergency";

const EmergencyButton = () => {
  const router = useRouter();
  const pulseAnim = useRef(new Animated.Value(0)).current;

  const setEmergencyId = useEmergencyState((e) => e.setEmergencyId);
  const { data: active } = useGetActiveEmergency();
  const { data: contacts } = useFetchContact();

  const contactCount = contacts?.length ?? 0;

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
    outputRange: [0.5, 0],
  });

  const onPress = () => {
    if (active) {
      setEmergencyId(active.id);
      router.replace("/alertActive");
      return;
    }
    router.replace("/countdown");
  };

  return (
    <View className="bg-white mt-5 w-[95%] mx-auto h-[300px] rounded-[40px] justify-center items-center">
      <View className="w-[180px] h-[180px] justify-center items-center">
        <Animated.View
          className="absolute w-[180px] h-[180px] rounded-full bg-red-400"
          style={{
            opacity: ringOpacity,
            transform: [{ scale: ringScale }],
          }}
        />

        <Pressable
          className="bg-red-600 w-[180px] h-[180px] rounded-full justify-center items-center active:opacity-80"
          onPress={onPress}
        >
          <MaterialCommunityIcons
            name="shield-alert-outline"
            size={32}
            color="white"
          />
          <Text className="text-white font-header text-xl mt-2">
            {active ? "VIEW EMERGENCY" : "EMERGENCY"}
          </Text>
          <Text className="text-white font-body text-xs mt-1">
            {active ? "Emergency in progress" : "Press to alert"}
          </Text>
        </Pressable>
      </View>

      <Text className="text-text3 font-body text-xs text-center mt-4 px-6">
        {active
          ? "Your emergency is still active. Tap to go back to it."
          : `You'll get 5 seconds to cancel before your ${contactCount} ${
              contactCount === 1 ? "contact is" : "contacts are"
            } notified.`}
      </Text>
    </View>
  );
};

export default EmergencyButton;
