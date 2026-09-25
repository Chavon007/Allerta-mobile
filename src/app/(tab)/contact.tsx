import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ContactCard from "@/components/contactCard";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Form from "@/components/Form";
import InputField from "@/components/inputField";
import Button from "@/components/Button";

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

const addOption: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  desc: string;
}[] = [
  {
    icon: "at",
    title: "username",
    desc: "Find someone already using the app",
  },
  {
    icon: "mail",
    title: "Email",
    desc: "Add someone who does not have the app",
  },
];

const Contact = () => {
  const [modal, setModal] = useState<"option" | "username" | "email" | null>(
    null,
  );

  return (
    <SafeAreaView className="flex-1 bg-background1">
      <ScrollView
        contentContainerClassName="px-5 pt-4 pb-28"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View>
          <Text className="font-headerMedium text-3xl text-text3">
            Contacts
          </Text>

          <Text className="mt-2 font-body text-sm text-text1">
            People alerted when you press Emergency
          </Text>
        </View>

        {/* Emergency Contacts */}
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

        {/* Add Contact */}
        <View className="mt-6">
          <Button
            textClassName="text-white"
            className="bg-background"
            onPress={() => setModal("option")}
          >
            <AntDesign name="user-add" size={20} color="white" />
            Add Emergency Contact
          </Button>
        </View>
      </ScrollView>

      {modal === "option" && (
        <View className="absolute inset-0 justify-end bg-black/30">
          <View className="h-[45%] rounded-t-3xl bg-white px-5 pb-8 pt-6">
            <Text className="font-headerMedium text-2xl text-text3">
              How do you want to add them?
            </Text>

            <View className="mt-6 gap-3">
              {addOption.map((a) => (
                <Pressable
                  key={a.title}
                  onPress={() =>
                    setModal(a.title === "username" ? "username" : "email")
                  }
                  className="rounded-2xl border border-[#e3eaf0] bg-background1 p-4"
                >
                  <View className="flex-row items-center">
                    <View className="h-11 w-11 items-center justify-center rounded-full bg-[#ddeef8]">
                      <Ionicons name={a.icon} size={22} color="#1e5975" />
                    </View>

                    <View className="ml-3 flex-1">
                      <Text className="font-headerMedium text-sm text-text3">
                        {a.title}
                      </Text>

                      <Text className="mt-1 font-body text-xs text-text1">
                        {a.desc}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      )}

      {/* {modal === "username" && (
        <View>
          <Form className="" onSubmit={} schema={}>
            {(methods, submitForm) => (
              <>
                <View>
                  <InputField label="Full name" placeholder="Joh Doe" />
                  <InputField label="Username" placeholder="davidJohn" />
                  <Pressable onPress={}>
                    <EvilIcons name="search" size={24} color="black" />
                  </Pressable>
                </View>

                <Pressable onPress={() => setModal("option")}>
                  <Text>Back</Text>
                </Pressable>
              </>
            )}
          </Form>
        </View>
      )} */}

      {/* {modal === "email" && (
        <View>
          <Text>Add by email</Text>
          <Text>
            They'll receive a secure, temporary emergency link — no account
            needed.
          </Text>

          <Form className="" onSubmit={} schema={}>
            {(methods, submitForm) => (
              <>
                <InputField label="Full name" placeholder="Joh Doe" />
                <InputField label="Email" placeholder="joh@gmail.com" />

                <Text>
                  During an emergency they get an emergency email with a secure
                  link that expires when the emergency ends.
                </Text>

                <Button>Add external contact</Button>

                <Pressable onPress={() => setModal("option")}>
                  <Text>Back</Text>
                </Pressable>
              </>
            )}
          </Form>
        </View>
      )} */}
    </SafeAreaView>
  );
};

export default Contact;
