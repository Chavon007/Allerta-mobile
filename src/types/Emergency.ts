export interface EmergencyContact {
  id: number;
  full_name: string;
  identifier: string;
  identifier_type: "email" | "username";
}
