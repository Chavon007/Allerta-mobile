import React from "react";
import { View, Text } from "react-native";
import Button from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import StepIndicator from "@/components/StepIndicator";
const Step1 = () => {
  return (
    <View>
      <Link href="/login">
        <Text>Skip</Text>
      </Link>

      <View>
        <Ionicons name="shield-checkmark-outline" size={24} color="black" />
        <Text>Stay connected when it matters most.</Text>
        <Text>
          Beacon keeps a small circle of people you trust one tap away.
        </Text>
        <StepIndicator currentStep={1} totalStep={3} />
      </View>

      <Button>Continue</Button>
    </View>
  );
};

export default Step1;
