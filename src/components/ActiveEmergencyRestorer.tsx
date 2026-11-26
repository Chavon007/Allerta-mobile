import { useEffect } from "react";
import { useGetActiveEmergency } from "@/api/emergency";
import { useEmergencyState } from "@/store/emergencyStore";
import { stopTracking } from "@/tasks/tracking";

export default function ActiveEmergencyRestorer() {
  const emergencyId = useEmergencyState((e) => e.emergencyId);
  const setEmergencyId = useEmergencyState((e) => e.setEmergencyId);

  const { data: active } = useGetActiveEmergency();

  useEffect(() => {
    if (active === undefined) return;

    setEmergencyId(active ? active.id : null);
    if (!active) stopTracking();
  }, [active]);

  return null;
}
