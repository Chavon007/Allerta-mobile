import { Text, View } from "react-native";
import StepIndicator from "@/components/StepIndicator";
import Button from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
const Step2 = () => {
  return (
    <View>
      <Link href="/login">
        <Text>Skip</Text>
      </Link>

      <View>
        <Ionicons />
        <Text>Share your location when you need help.</Text>
        <Text>
          Your location is not shared by default — only during an active
          emergency.
        </Text>
        <StepIndicator currentStep={3} totalStep={3} />
      </View>

      <Button onPress={() => router.push("/create-account")}>
        Create Account
      </Button>
      <Button onPress={() => router.push("/login")}>Login</Button>
    </View>
  );
};

export default Step2;
