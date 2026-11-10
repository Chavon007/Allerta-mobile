import { useEffect, useState } from "react";
import { Coords } from "./useLocation";

const KEY = process.env.EXPO_PUBLIC_GEOAPIFY_KEY;

export function useLocalAddress(coords: Coords | null) {
  const [address, setAddress] = useState<string | null>(null);
  const lat = coords ? coords.latitude.toFixed(4) : null;
  const lon = coords ? coords.longitude.toFixed(4) : null;

  useEffect(() => {
    if (!lat || !lon) return;
    let cancelled = false;

    fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${KEY}`,
    )
      .then((r) => r.json())
      .then((json) => {
        const r = json?.results?.[0];
        if (!r || cancelled) return;

        // for a shop, skip its name and keep the street part
        const text =
          r.result_type === "amenity"
            ? (r.address_line2 ?? r.formatted)
            : r.formatted;

        if (text) setAddress(text);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [lat, lon]);

  return address;
}
