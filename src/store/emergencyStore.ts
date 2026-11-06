import { create } from "zustand";

interface EmergencyState {
  emergencyId: number | null;
  setEmergencyId: (id: number | null) => void;
}

export const useEmergencyState = create<EmergencyState>((set) => ({
  emergencyId: null,
  setEmergencyId: (id) => set({ emergencyId: id }),
}));
