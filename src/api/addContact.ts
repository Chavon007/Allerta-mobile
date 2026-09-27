import { AddContactDTO } from "@/schema/contactSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/service/api";
import Toast from "react-native-toast-message";


const addContact = async (data: AddContactDTO) => {
  const response = await apiClient.post("/emergency-contacts", data);

  return response.data;
};

export const useAddContactMutation = () => {
  return useMutation({
    mutationFn: addContact,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Contact added",
      });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Failed to add contact";
      Toast.show({
        type: "error",
        text1: message,
      });
    },
  });
};
