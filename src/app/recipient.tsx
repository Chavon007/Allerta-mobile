import { View, Text, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";
const Recipient = () => {
  return (
    <SafeAreaView className="bg-background flex-1">
      <View className="flex-1 flex flex-col  justify-between py-12">
        <Text className=" text-center text-sm uppercase font-header text-text font-bold ">
          Connected contact · Sarah's phone
        </Text>

        <Pressable className=" ">
          <View className="bg-background1 w-[90%] mx-auto rounded-3xl p-2">
            <View className="gap-3">
              <View className="flex-row items-center justify-between p-2">
                <View className="bg-[#FEE2E2] p-2 rounded-full">
                  <MaterialCommunityIcons
                    name="shield-alert-outline"
                    size={24}
                    color="#EF4444"
                  />
                </View>
                <View className="w-[60%] ">
                  <Text className="text-text3 font-header text-xl font-bold leading-8">
                    🚨 Emergency Alert
                  </Text>
                  <Text className="text-text1 font-body text-sm">
                    Allerta . now
                  </Text>
                </View>
                <Feather name="arrow-right" size={20} color="#3d7a9a" />
              </View>
            </View>
            <Text className="px-5 py-2 text-text3 font-bodyMedium text-sm tracking-wider leading-5">
              Salvation may need your help. Tap to view their live location.
            </Text>
          </View>
        </Pressable>

        <View className="gap-4 items-center">
          <Text className="text-sm font-headerMedium text-text">
            Tap the notification to open the alert.
          </Text>

          <Link href="/(tab)/home" asChild>
            <Pressable className="">
              <Text className="text-text italic font-button text-xs underline">
                Back to Allerta
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Recipient;
