import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/Button";
import { Text, View } from "react-native";

const Index = () => {
  return (
    <View>
      <View>
        <Ionicons name="shield-checkmark-outline" size={24} color="black" />
        <Text>Allerta</Text>
        <Text> One tap. Your people will know.</Text>
      </View>

      <View>
        <Button
          //   onPress={}
          icon={<Ionicons name="arrow-forward" size={18} color="#fff" />}
        >
          Get started
        </Button>
        <Text>
          Allerta is a trusted-contact safety layer — not a replacement for
          emergency services.
        </Text>
      </View>
    </View>
  );
};

export default Index;
