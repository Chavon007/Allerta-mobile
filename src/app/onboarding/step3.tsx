import { Text, View } from "react-native";
import StepIndicator from "@/components/StepIndicator";
import Button from "@/components/Button";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
const Step2 = () => {
  return (
    <SafeAreaView className="bg-background1 flex-1">
      <View className=" h-screen flex flex-col items-center justify-between py-12">
        <View className="items-end w-[85%] mx-auto">
          <Link className="" href="/login">
            <Text className="text-background font-medium text-base  font-body">
              Skip
            </Text>
          </Link>
        </View>

        <View className="gap-2 w-[90%] mx-auto">
          <View className="bg-[#ddeef8] p-6 w-[20%] rounded-full">
            <SimpleLineIcons name="location-pin" size={30} color="#3d7a9a" />
          </View>
          <Text className="text-black text-3xl mt-2 font-bold font-header">
            Share your location when you need help.
          </Text>
          <Text className="text-text3 font-body text-base font-medium mt-3">
            Your location is not shared by default — only during an active
            emergency.
          </Text>
          <StepIndicator currentStep={3} totalStep={3} />
        </View>

        <View className="w-[90%] gap-5">
          <Button
            textClassName="text-text"
            className="bg-background"
            onPress={() => router.push("/create-account")}
          >
            Create Account
          </Button>
          <Button
            textClassName="text-black"
            className="bg-white"
            onPress={() => router.push("/login")}
          >
            Login
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Step2;
