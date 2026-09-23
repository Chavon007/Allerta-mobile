import { Text, View } from "react-native";
import StepIndicator from "@/components/StepIndicator";
import Button from "@/components/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
const Step2 = () => {
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
            name="bell-ring-outline"
            size={30}
            color="#3d7a9a"
          />
        </View>
        <Text className="text-black text-3xl mt-2 font-bold font-header">
          One tap can alert your people.
        </Text>
        <Text className="text-text3 font-body text-base font-medium mt-3">
          No typing, no menus. Press once and your contacts are notified.
        </Text>
        <StepIndicator currentStep={2} totalStep={3} />
      </View>

      <Button
        textClassName="text-text"
        className="bg-background w-[90%]"
        onPress={() => router.push("/onboarding/step3")}
      >
        Continue
      </Button>
    </View>
  );
};

export default Step2;
