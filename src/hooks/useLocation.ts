import { useEffect, useRef } from "react";
import * as Location from "expo-location";

export type Coords = { latitude: number; longitude: number };

const MAX_AGE = 60_000;

let cached: { coords: Coords; at: number } | null = null;

const remember = (p: Location.LocationObject) => {
  cached = {
    coords: { latitude: p.coords.latitude, longitude: p.coords.longitude },
    at: Date.now(),
  };
};

// Call once when the app is ready. Returns the subscription so it can be removed.
export async function startLocationWarmup() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") return null;

  const last = await Location.getLastKnownPositionAsync({ maxAge: MAX_AGE });
  if (last) remember(last);

  return Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 10_000,
      distanceInterval: 20,
    },
    remember,
  );
}

export async function getCurrentCoords(): Promise<Coords> {
  // fast path: a fresh position is already waiting
  if (cached && Date.now() - cached.at < MAX_AGE) return cached.coords;

  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") throw new Error("Location permission denied");

  const position = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });
  remember(position);

  return cached!.coords;
}

// Continuously watch location while an emergency is active
export function useWatchLocation(
  enabled: boolean,
  onUpdate: (coords: Coords) => void,
) {
  const callbackRef = useRef(onUpdate);
  callbackRef.current = onUpdate;

  useEffect(() => {
    if (!enabled) return;

    let subscription: Location.LocationSubscription | null = null;
    let cancelled = false;

    const startWatching = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted" || cancelled) return;

        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000,
            distanceInterval: 10,
          },
          (position) => {
            callbackRef.current({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
        );

        if (cancelled) {
          subscription.remove();
          subscription = null;
        }
      } catch (error) {
        console.error("Location watcher error:", error);
      }
    };

    startWatching();

    return () => {
      cancelled = true;
      subscription?.remove();
    };
  }, [enabled]);
}
