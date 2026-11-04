export const seedAlert = {
  startedAt: "12:03 PM",
  address: "Admiralty Way, Lekki Phase 1, Lagos",
  status: "Live location updating",
  coords: { latitude: 6.4474, longitude: 3.4723 },
  contacts: [
    { id: "1", fullName: "Sarah Johnson", status: "Notified" },
    { id: "2", fullName: "Michael Brown", status: "Seen" },
    { id: "3", fullName: "Jackson Caleb", status: "Unnotified" },
  ] as const,
};

export type Alert = typeof seedAlert;
