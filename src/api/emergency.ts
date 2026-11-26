import {
  Emergency,
  EmergencyHistory,
  EmergencyLocation,
  MyEmergency,
} from "@/types/Emergency";
import { AddContactDTO } from "@/schema/contactSchema";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import apiClient from "@/service/api";
import Toast from "react-native-toast-message";
import { EmergencyContact } from "@/types/Emergency";
import { EmergencyDTO, emergencySchema } from "@/schema/emergencySchema";
export interface ReceivedEmergency extends Emergency {
  user: { id: number; full_name: string; username?: string };
}

export interface Page<T> {
  data: T[];
  current_page: number;
  last_page: number;
}
type sendLocationVars = EmergencyDTO & { id: number };

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

const startEmergency = async (data: EmergencyDTO): Promise<Emergency> => {
  const payload = emergencySchema.parse(data);
  const response = await apiClient.post("/emergency", {
    latitude: payload.latitude,
    longitude: payload.longitude,
  });

  return response.data;
};

const endEmergency = async (id: number): Promise<Emergency> => {
  const response = await apiClient.post(`/emergency/${id}/end`);
  return response.data;
};

const getEmergency = async (id: number): Promise<Emergency> => {
  const response = await apiClient.get(`emergency/${id}`);
  return response.data;
};

const sendLocation = async ({
  id,
  ...coords
}: sendLocationVars): Promise<EmergencyLocation> => {
  const payload = emergencySchema.parse(coords);
  const response = await apiClient.post(`/emergency/${id}/location`, payload);
  return response.data;
};

const history = async (id: number): Promise<EmergencyLocation[]> => {
  const response = await apiClient.get(`/emergency/${id}/history`);

  return response.data;
};

const recieveEmergency = async (): Promise<ReceivedEmergency[]> => {
  const response = await apiClient.get("/emergency/received");
  return response.data;
};
const respondEmergency = async ({
  id,
}: {
  id: number;
  name: string;
}): Promise<Emergency> => {
  const response = await apiClient.post(`/emergency/${id}/respond`, {
    status: "on_my_way",
  });
  return response.data;
};
const getUserAllEmergency = async (
  page: number,
): Promise<Page<MyEmergency>> => {
  const response = await apiClient.get("/emergency/mine", {
    params: { page },
  });
  return response.data;
};

const getActiveEmergency = async (): Promise<MyEmergency | null> => {
  const resposne = await apiClient.get("/emergency/mine");

  return resposne.data;
};

export const useGetActiveEmergency = () => {
  return useQuery({
    queryKey: ["active-emergency"],
    queryFn: getActiveEmergency,
  });
};
export const useGetUserAllEmergency = () => {
  return useInfiniteQuery({
    queryKey: ["my-emergency"],
    queryFn: ({ pageParam }) => getUserAllEmergency(pageParam),
    initialPageParam: 1,
    getNextPageParam: (last) =>
      last.current_page < last.last_page ? last.current_page + 1 : undefined,
  });
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

export const useRespondEmergency = () => {
  return useMutation({
    mutationFn: respondEmergency,
    onSuccess: (_data, { name }) => {
      Toast.show({
        type: "success",
        text1: `${name} has been informed you are on your way`,
      });
    },
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: error?.response?.data?.message || "Something went wrong",
      });
    },
  });
};
export const useRecieveEmergency = () => {
  return useQuery({
    queryKey: ["receive-emeregency"],
    queryFn: recieveEmergency,
    refetchInterval: 5000,
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
      (await queryClient.invalidateQueries({ queryKey: ["fetch-contact"] }),
        Toast.show({
          type: "success",
          text1: `Contact removed successfully`,
        }));
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

export const useStartEmergency = () => {
  return useMutation<Emergency, any, EmergencyDTO>({
    mutationFn: startEmergency,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Emergency has started",
      });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to start emergency";
      Toast.show({
        type: "error",
        text1: message,
      });
    },
  });
};

export const useEndEmergency = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: endEmergency,
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["emergency", id] });
      queryClient.invalidateQueries({ queryKey: ["my-emergency"] });
      queryClient.invalidateQueries({ queryKey: ["active-emergency"] });
      Toast.show({
        type: "success",
        text1: "Emergency has ended",
      });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to end emergency";
      Toast.show({
        type: "error",
        text1: message,
      });
    },
  });
};

export const useGetEmergency = (id: number | null, refetchMs?: number) => {
  return useQuery({
    queryKey: ["emergency", id],
    queryFn: () => getEmergency(id as number),
    enabled: id !== null,
    refetchInterval: refetchMs,
  });
};

export const useSendLocation = () => {
  return useMutation<EmergencyLocation, any, sendLocationVars>({
    mutationFn: sendLocation,
  });
};

export const useHistory = (id: number | null) => {
  return useQuery({
    queryKey: ["emergency-history", id],
    queryFn: () => history(id as number),
    enabled: id !== null,
  });
};
