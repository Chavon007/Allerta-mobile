import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  coords: { latitude: number; longitude: number };
  address: string;
};

export default function LocationMap({ coords, address }: Props) {
  return (
    <View className="h-64 overflow-hidden rounded-2xl bg-white">
      <MapView
        style={{ flex: 1 }}
        scrollEnabled={false}
        region={{ ...coords, latitudeDelta: 0.005, longitudeDelta: 0.005 }}
      >
        <Marker coordinate={coords}>
          <View className="h-10 w-10 items-center justify-center rounded-full border-[3px] border-white bg-emergency">
            <Ionicons name="location" size={20} color="#fff" />
          </View>
        </Marker>
      </MapView>

      <View className="absolute bottom-3 left-3 right-3 flex-row items-center gap-2 rounded-xl bg-white px-3 py-2.5">
        <View className="h-1.5 w-1.5 rounded-full bg-emergency" />
        <View className="flex-1">
          <Text className="font-body text-[10px] uppercase tracking-wide text-backgroundLight">
            Live location
          </Text>
          <Text className="font-bodyMedium text-sm text-text3">
            {address}
          </Text>
        </View>
      </View>
    </View>
  );
}