import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Button from "@/components/Button";
import { Text, View } from "react-native";

const Index = () => {
  return (
    <View className="bg-background h-screen flex flex-col items-center justify-between py-12">
      <View className="flex-1 flex flex-col justify-center items-center gap-2 p-4">
        <View className="bg-backgroundLight p-5 rounded-3xl">
          <MaterialCommunityIcons
            name="shield-check-outline"
            size={50}
            color="white"
          />
        </View>
        <Text className="text-3xl font-header uppercase font-bold text-text mt-2">
          Allerta
        </Text>
        <Text className="text-text font-semibold text-xl font-body">
          One tap. Your people will know.
        </Text>
      </View>

      <View className="w-[90%] mx-auto flex gap-3">
        <Button
          icon={<Ionicons name="arrow-forward" size={18} color="#1e5975" />}
        >
          Get started
        </Button>
        <Text className="text-text text-center text-xs font-body">
          Allerta is a trusted-contact safety layer — not a replacement for
          emergency services.
        </Text>
      </View>
    </View>
  );
};

export default Index;
