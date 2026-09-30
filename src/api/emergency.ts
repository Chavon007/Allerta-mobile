import { AddContactDTO } from "@/schema/contactSchema";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import apiClient from "@/service/api";
import Toast from "react-native-toast-message";
import { EmergencyContact } from "@/types/Emergency";

const addContact = async (data: AddContactDTO) => {
  const response = await apiClient.post("/emergency-contacts", data);

  return response.data;
};

const fetchContact = async (): Promise<EmergencyContact[]> => {
  const response = await apiClient.get("/emergency-contacts");
  return response.data;
};

const removeContact = async (id: number) => {
  const response = await apiClient.delete(`/emergency-contacts/${id}`);
  return response.data;
};

export const useAddContactMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addContact,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["fetch-contact"] });
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

export const useFetchContact = () => {
  return useQuery({
    queryKey: ["fetch-contact"],
    queryFn: fetchContact,
  });
};

export const useRemoveContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeContact,
    onSuccess: async () => {
     await queryClient.invalidateQueries({ queryKey: ["fetch-contact"] }),
        Toast.show({
          type: "success",
          text1: `Contact removed successfully`,
        });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to remove contact";
      Toast.show({
        type: "error",
        text1: message,
      });
    },
  });
};
