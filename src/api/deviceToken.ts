import apiClient from "@/service/api";
import { Platform } from "react-native";

export const saveDeviceToken = async (token: string) => {
  const response = await apiClient.post("/device-token", {
    token,
    platform: "android",
  });

  return response.data;
};

export const deleteDeviceToken = async (token: string) => {
  const response = await apiClient.delete("/device-delete", {
    data: { token },
  });

  return response.data;
};
