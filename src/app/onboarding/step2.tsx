import { Text, View } from "react-native";
import StepIndicator from "@/components/StepIndicator";
import Button from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
const Step2 = () => {
  return (
    <View>
      <Link href="/login">
        <Text>Skip</Text>
      </Link>

      <View>
        <Ionicons />
        <Text>One tap can alert your people.</Text>
        <Text>
          No typing, no menus. Press once and your contacts are notified.
        </Text>
        <StepIndicator currentStep={2} totalStep={3} />
      </View>

      <Button>Continue</Button>
    </View>
  );
};

export default Step2;
