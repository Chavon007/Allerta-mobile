
import { View, Text } from "react-native";
import Button from "@/components/Button";
import {  MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import StepIndicator from "@/components/StepIndicator";

const Step1 = () => {
  return (
    <View className="bg-background1 h-screen flex flex-col items-center justify-between py-12">
      <View className="items-end w-[85%] mx-auto">
        <Link className="" href="/login">
          <Text className="text-background font-medium text-base  font-body">
            Skip
          </Text>
        </Link>
      </View>

      <View className="gap-2 w-[90%] mx-auto">
        <View className="bg-[#ddeef8] p-6 w-[20%] rounded-full">
          <MaterialCommunityIcons
            name="shield-check-outline"
            size={30}
            color="#3d7a9a"
          />
        </View>
        <Text className="text-black text-3xl mt-2 font-bold font-header">
          Stay connected when it matters most.
        </Text>
        <Text className="text-text3 font-body text-base font-medium mt-3">
          Beacon keeps a small circle of people you trust one tap away.
        </Text>
        <StepIndicator currentStep={1} totalStep={3} />
      </View>

      <Button  textClassName="text-text" className="bg-background w-[90%]" onPress={() => router.push("/onboarding/step2")}>Continue</Button>
    </View>
  );
};

export default Step1;
