import { View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface ContactProps {
  initials: string;
  full_name: string;
  identifier: string;
  status: string;
  statusIcon: keyof typeof Ionicons.glyphMap;
}

const ContactCard = ({
  initials,
  full_name,
  identifier,
  status,
  statusIcon,
}: ContactProps) => {
  const router = useRouter();

  return (
    <View className="rounded-2xl border border-[#e3eaf0] bg-white p-4">
      {/* Contact Info */}
      <View className="flex-row items-center">
        {/* Initials */}
        <View className="h-11 w-11 items-center justify-center rounded-full bg-[#ddeef8]">
          <Text className="font-headerMedium text-sm text-background">
            {initials}
          </Text>
        </View>

        {/* Name + Identifier */}
        <View className="ml-3 flex-1">
          <Text className="font-bodyMedium text-sm text-text3">
            {full_name}
          </Text>

          <Text className="mt-1 font-body text-xs text-text1">
            {identifier}
          </Text>
        </View>

        {/* status */}
        <View
          className={`flex-row items-center rounded-full px-2.5 py-1.5 ${
            status === "External" ? "bg-[#edf0f2]" : "bg-green-100"
          }`}
        >
          <Ionicons
            name={statusIcon}
            size={13}
            color={status === "External" ? "#404a54" : "#22c55e"}
          />

          <Text
            className={`ml-1 font-bodyMedium text-[10px] ${
              status === "External" ? "text-text3" : "text-green-500"
            }`}
          >
            {status}
          </Text>
        </View>
      </View>

      {/* Remove */}
      <Pressable
        onPress={() => router.replace("/")}
        className="mt-4 flex-row items-center justify-center rounded-xl border border-[#e3eaf0] py-2.5"
      >
        <MaterialCommunityIcons
          name="delete-outline"
          size={18}
          color="#ef4444"
        />

        <Text className="ml-2 font-bodyMedium text-xs text-red-500">
          Remove
        </Text>
      </Pressable>
    </View>
  );
};

export default ContactCard;
