import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ContactCard from "@/components/contactCard";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Form from "@/components/Form";
import InputField from "@/components/inputField";
import Button from "@/components/Button";
import { useAddContactMutation } from "@/api/addContact";
import { AddContactDTO, addContactSchema } from "@/schema/contactSchema";
import { router } from "expo-router";

const contacts: {
  initials: string;
  full_name: string;
  identifier: string;
  status: string;
  statusIcon: keyof typeof Ionicons.glyphMap;
}[] = [
  {
    initials: "SJ",
    full_name: "Sarah Johnson",
    identifier: "@sarahjohnson",
    status: "Connected",
    statusIcon: "checkmark",
  },
  {
    initials: "MA",
    full_name: "Michael Azuh",
    identifier: "michael@gmail.com",
    status: "External",
    statusIcon: "mail",
  },
];

const Contact = () => {
  const [modal, setModal] = useState(false);
  const { mutate, isPending } = useAddContactMutation();

  return (
    <SafeAreaView className="flex-1 bg-background1">
      <ScrollView
        contentContainerClassName="px-5 pt-4 pb-28"
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text className="font-headerMedium text-3xl text-text3">
            Contacts
          </Text>
          <Text className="mt-2 font-body text-sm text-text1">
            People alerted when you press Emergency
          </Text>
        </View>

        <View className="mt-8">
          <Text className="mb-3 font-headerMedium text-lg text-text3">
            Emergency contacts
          </Text>
          <View className="gap-3">
            {contacts.map((c) => (
              <ContactCard
                key={c.full_name}
                identifier={c.identifier}
                initials={c.initials}
                full_name={c.full_name}
                status={c.status}
                statusIcon={c.statusIcon}
              />
            ))}
          </View>
        </View>

        <View className="mt-6">
          <Button
            textClassName="text-white"
            className="bg-background"
            onPress={() => setModal(true)}
          >
            <AntDesign name="user-add" size={20} color="white" />
            Add Emergency Contact
          </Button>
        </View>
      </ScrollView>

      {modal && (
        <View className="absolute inset-0 justify-end bg-black/30">
          <View className="h-[45%] rounded-t-3xl bg-white px-5 pb-8 pt-6">
            <Text className="font-headerMedium text-2xl text-text3">
              Add contact through their Username or email
            </Text>

            <View className="mt-6 gap-3">
              <Form<AddContactDTO> className="" onSubmit={() => {}} schema={addContactSchema}>
                {(methods) => {
                  const handleAddContact = (data: AddContactDTO) => {
                    mutate(data, {
                      onSuccess: () => {
                        router.replace("/(tab)/contact");
                      },
                      onError: (error: any) => {
                        const fieldError =
                          error?.response?.data?.errors?.identifier?.[0];
                        if (fieldError) {
                          methods.setError("identifier", {
                            message: fieldError,
                          });
                        }
                      },
                    });
                  };

                  return (
                    <>
                      <View>
                        <InputField
                          label="Username or Email"
                          name="identifier"
                          control={methods.control}
                          keyboardType="default"
                          placeholder="davidJohn or test@gmail.com"
                          error={methods.formState.errors.identifier}
                        />
                        <Button
                          textClassName="text-white"
                          className="bg-background mt-2"
                          spinnerColor="#ffffff"
                          isLoading={isPending}
                          onPress={methods.handleSubmit(handleAddContact)}
                          loadingText="Adding..."
                        >
                          Add contact
                        </Button>
                      </View>

                      <Pressable onPress={() => setModal(false)}>
                        <Text className="font-bodyMedium text-xm text-backgroundLight font-medium">
                          Back
                        </Text>
                      </Pressable>
                    </>
                  );
                }}
              </Form>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Contact;
