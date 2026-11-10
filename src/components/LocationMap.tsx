import { useEffect, useState } from "react";
import { View, Text, Image, LayoutChangeEvent } from "react-native";

type Props = {
  coords: { latitude: number; longitude: number };
  address: string;
};

const KEY = process.env.EXPO_PUBLIC_GEOAPIFY_KEY;
const HEIGHT = 256;

function LocationMap({ coords, address }: Props) {
  const [width, setWidth] = useState(0);
  const [failed, setFailed] = useState(false);

  const onLayout = (e: LayoutChangeEvent) =>
    setWidth(Math.round(e.nativeEvent.layout.width));

  // 4 decimals is about 11 m, which keeps the image URL stable
  const lat = Number(coords.latitude).toFixed(4);
  const lon = Number(coords.longitude).toFixed(4);

  const uri =
    width > 0
      ? `https://maps.geoapify.com/v1/staticmap?style=osm-bright` +
        `&width=${width}&height=${HEIGHT}&zoom=16` +
        `&center=lonlat:${lon},${lat}` +
        `&marker=lonlat:${lon},${lat};color:%23d91e2a;size:large` +
        `&apiKey=${KEY}`
      : null;

  // try again whenever the map URL changes
  useEffect(() => {
    setFailed(false);
  }, [uri]);

  return (
    <View
      className="h-64 overflow-hidden rounded-2xl bg-gray-100"
      onLayout={onLayout}
    >
      {uri && !failed ? (
        <Image
          source={{ uri }}
          style={{ width: "100%", height: HEIGHT }}
          resizeMode="cover"
          onError={(e) => {
            console.log("map error:", e.nativeEvent);
            setFailed(true);
          }}
        />
      ) : failed ? (
        <View className="flex-1 items-center justify-center">
          <Text className="font-body text-xs text-text1">Map unavailable</Text>
        </View>
      ) : null}

      <View className="absolute bottom-3 left-3 right-3 flex-row items-center gap-2 rounded-xl bg-white px-3 py-2.5">
        <View className="h-1.5 w-1.5 rounded-full bg-emergency" />
        <View className="flex-1">
          <Text className="font-body text-[10px] uppercase tracking-wide text-backgroundLight">
            Live location
          </Text>
          <Text className="font-bodyMedium text-sm text-text3">{address}</Text>
        </View>
      </View>
    </View>
  );
}

export default LocationMap;