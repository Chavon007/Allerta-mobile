import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoginDTO, SignupDTO } from "@/schema/authSchema";
import apiClient from "@/service/api";
import { useAuthStore } from "@/store/authStore";
import Toast from "react-native-toast-message";
import { UpdateProfileDTO } from "@/schema/authSchema";
import { success } from "zod";

const signupFn = async (data: SignupDTO) => {
  return apiClient.post("/auth/signup", {
    full_name: data.full_name,
    email: data.email,
    username: data.username,
    password: data.password,
  });
};

const loginFn = async (data: LoginDTO) => {
  return apiClient.post("/auth/login", data);
};

const fetchUser = async () => {
  return apiClient.get("/auth/me");
};

const updateProfile = async (data: UpdateProfileDTO) => {
  const response = await apiClient.put("/auth/profile/update", data);
  return response.data;
};
export const useSignupMutation = () => {
  return useMutation({
    mutationFn: signupFn,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Account created successfully",
      });
    },
  });
};

export const useLoginMutation = () => {
  return useMutation({
    retry: (failureCount, error: any) => !error?.response && failureCount < 2,
    retryDelay: 1000,
    mutationFn: async (data: LoginDTO) => {
      const loginRes = await loginFn(data);
      const { token, user } = loginRes.data;
      await useAuthStore.getState().login(user, token);
      return user;
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Login successful",
        text2: "Welcome back!",
      });
    },
    onError(error: any) {
      const message = error?.response?.data?.message || "Failed to login";
      Toast.show({
        type: "error",
        text1: message,
      });
    },
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async (data: UpdateProfileDTO) => {
      const res = await updateProfile(data);
      useAuthStore.getState().setUser(res.data);
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Profile updated successfully",
      });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to update profile";
      Toast.show({
        type: "error",
        text1: message,
      });
    },
  });
};
