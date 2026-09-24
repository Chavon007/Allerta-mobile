import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoginDTO, SignupDTO } from "@/schema/authSchema";
import apiClient from "@/service/api";
import { useAuthStore } from "@/store/authStore";
import Toast from "react-native-toast-message";

const signupFn = async (data: SignupDTO) => {
  return apiClient.post("/auth/signup", {
    full_name: data.fullName,
    email: data.email,
    username: data.username,
    password: data.password,
  });
};

const loginFn = async (data: LoginDTO) => {
  return apiClient.post("/auth/login", data);
};

const fetchUser = async () => {
  return apiClient.get("/me");
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
    mutationFn: async (data: LoginDTO) => {
      const loginRes = await loginFn(data);
      const { token, user } = loginRes.data;
      await useAuthStore.getState().login(user, token);
      const userRes = await fetchUser();
      return userRes.data;
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Login successful",
        text2: "Welcome back!",
      });
    },
    onError(error: any) {
      const message = error?.response?.data.message || "Faled to login";
      Toast.show({
        type: "error",
        text1: message,
      });
    },
  });
};
