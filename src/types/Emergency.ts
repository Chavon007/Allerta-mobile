export interface EmergencyContact {
  id: number;
  full_name: string;
  identifier: string;
  identifier_type: "email" | "username";
}

export type EmergencyStatus = "active" | "ended";
export type RecipientStatus = "notifed" | "on my way";

export interface EmergencyRecipientInfo {
  id: number;
  status: RecipientStatus;
  contact?: { id: number; full_name: string };
}
export interface Emergency {
  id: number;
  user_id: number;
  status: EmergencyStatus;
  latest_latitude: number;
  latest_longitude: number;
  latest_address: string | null;
  started_at: string;
  ended_at: string | null;
  created_at: string;
  updated_at: string;
  full_name?: string;
  recipients?: EmergencyRecipientInfo[];
}

export interface MyEmergency extends Emergency {}
export interface EmergencyLocation {
  id: number;
  emergency_id: number;
  latitude: number;
  longitude: number;
  address: string | null;
  created_at: string;
  updated_at: string;
  full_name?: string;
  username?: string;
}

export type EmergencyHistory = EmergencyLocation[];
