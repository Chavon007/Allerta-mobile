import { useEffect } from "react";
import { useGetUserAllEmergency } from "@/api/emergency";
import { useEmergencyState } from "@/store/emergencyStore";

export default function ActiveEmergencyRestorer() {
  const setEmergencyId = useEmergencyState((e) => e.setEmergencyId);
  const { data: emergency } = useGetUserAllEmergency();

  useEffect(() => {
    const active = emergency?.find((e) => e.status === "active");
    if (active) setEmergencyId(active.id);
  }, [emergency]);

  return null;
}
