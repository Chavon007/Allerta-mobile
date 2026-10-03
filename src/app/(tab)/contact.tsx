import React, { useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ContactCard from "@/components/contactCard";
import { AntDesign } from "@expo/vector-icons";
import Form from "@/components/Form";
import InputField from "@/components/inputField";
import Button from "@/components/Button";
import { useAddContactMutation, useFetchContact } from "@/api/emergency";
import { AddContactDTO, addContactSchema } from "@/schema/contactSchema";

const Contact = () => {
  const [modal, setModal] = useState(false);
  const { mutate, isPending } = useAddContactMutation();
  const { data, isLoading, isError, refetch, isRefetching } =
    useFetchContact();

  // Refetch every time the screen comes back into focus (skip the first one)
  const isFirstFocus = useRef(true);
  useFocusEffect(
    useCallback(() => {
      if (isFirstFocus.current) {
        isFirstFocus.current = false;
        return;
      }
      refetch();
    }, [refetch]),
  );

  const getInitials = (full_name: string) => {
    const names = full_name.trim().split(" ");

    if (names.length === 1) {
      return names[0][0].toUpperCase();
    }

    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  };

  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center bg-background1">
        <ActivityIndicator color="#3d7a9a" />
        <Text className="mt-2 font-bodyMedium text-xs text-text1">
          Loading contacts...
        </Text>
      </View>
    );

  if (isError)
    return (
      <View className="flex-1 items-center justify-center bg-background1 px-5">
        <Text className="font-headerMedium text-base text-text3">
          Unable to load contacts
        </Text>
        <Text className="mt-1 text-center font-body text-xs text-text1">
          Something went wrong while fetching your emergency contacts.
        </Text>
      </View>
    );

  return (
    <SafeAreaView className="flex-1 bg-background1">
      <ScrollView
        contentContainerClassName="px-5 pt-4 pb-28"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor="#3d7a9a"
          />
        }
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
            {data && data.length > 0 ? (
              data.map((c) => {
                const isEmail = c.identifier_type === "email";

                return (
                  <ContactCard
                    key={c.id}
                    id={c.id}
                    identifier={c.identifier}
                    initials={getInitials(c.full_name)}
                    full_name={c.full_name}
                    status={isEmail ? "External" : "Connected"}
                    statusIcon={isEmail ? "mail" : "checkmark"}
                  />
                );
              })
            ) : (
              <View className="items-center rounded-2xl border border-[#e3eaf0] bg-white px-5 py-8">
                <Text className="font-headerMedium text-base text-text3">
                  No emergency contacts
                </Text>
                <Text className="mt-1 text-center font-body text-xs text-text1">
                  You have not added any emergency contacts yet.
                </Text>
              </View>
            )}
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
        <KeyboardAvoidingView
          behavior="padding"
          className="absolute inset-0 justify-end bg-black/30"
        >
          <View className="rounded-t-3xl bg-white px-5 pb-8 pt-6 h-[40%]">
            <Text className="font-headerMedium text-base text-text3">
              Add contact through their username or email
            </Text>

            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View className="mt-6 gap-3">
                <Form<AddContactDTO>
                  className=""
                  onSubmit={() => {}}
                  schema={addContactSchema}
                >
                  {(methods) => {
                    const handleAddContact = (data: AddContactDTO) => {
                      mutate(data, {
                        onSuccess: () => {
                          setModal(false);
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
                          <Text className="font-bodyMedium text-center mt-6 text-xm text-backgroundLight font-medium">
                            Back
                          </Text>
                        </Pressable>
                      </>
                    );
                  }}
                </Form>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default Contact;