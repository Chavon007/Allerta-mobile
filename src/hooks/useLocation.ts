import { useEffect, useRef } from "react";
import * as Location from "expo-location";

export type Coords = { latitude: number; longitude: number };

// One-time position, used when the emergency starts

export async function getCurrentCoords(): Promise<Coords> {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    throw new Error("Location permission denied");
  }

  const position = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });

  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
}

// Live updates, used on the alert screen

export function useWatchLocation(
  enabled: boolean,
  onUpdate: (coords: Coords) => void,
) {
  // keep the latest callback without restarting the watcher

  const callbackRef = useRef(onUpdate);
  callbackRef.current = onUpdate;

  useEffect(() => {
    if (!enabled) return;

    let subscription: Location.LocationSubscription | null = null;
    let cancelled = false;

    async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted" || cancelled) return;

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (position) =>
          callbackRef.current({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
      );

      // screen closed while we were still setting up

      if (cancelled) subscription.remove();
    };

    return () => {
      cancelled = true;
      subscription?.remove();
    };
  }, [enabled]);
}
