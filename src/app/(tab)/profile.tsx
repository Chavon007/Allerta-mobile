import {
  View,
  Text,
  Modal,
  Pressable,
  ScrollView,
  Switch,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "@/store/authStore";
import { Link, useRouter } from "expo-router";
import Form from "@/components/Form";
import Button from "@/components/Button";
import InputField from "@/components/inputField";
import { UpdateProfileDTO, UpdateProfileSchema } from "@/schema/authSchema";
import { useUpdateProfile } from "@/api/auth";
import { useFetchContact } from "@/api/emergency";
import {
  Feather,
  SimpleLineIcons,
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
  EvilIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useState, useMemo } from "react";

interface safetySectionProps {
  icon: string;
  text: string;
  description: string;
  iconLibrary: "Ionicons" | "MaterialCommunityIcons";
  link?: string;
}

interface PermissionsProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconLibrary: "SimpleLineIcons" | "MaterialCommunityIcons";
}

interface accountSectionProps {
  id: string;
  title: string;
  icon: string;
  iconLibrary: "EvilIcons" | "Ionicons" | "FontAwesome5" | "MaterialIcons";
}

const MAX_CONTACTS = 3;

const privacyList = [
  {
    title: "Your location is not continuously shared by default.",
    icon: "shield-check-outline",
  },
  {
    title:
      "Live location sharing begins only during an active emergency and stops the moment you end it.",
    icon: "shield-check-outline",
  },
  {
    title: "You can remove a trusted contact at any time.",
    icon: "shield-check-outline",
  },
];

const safetySection: safetySectionProps[] = [
  {
    icon: "people-outline",
    text: "Emergency contacts",
    description: "People in your trusted circle",
    iconLibrary: "Ionicons",
    link: "/(tab)/contact",
  },
  {
    icon: "credit-card-outline",
    text: "Contact slots & plan",
    description: `Free plan. ${MAX_CONTACTS} contacts included`,
    iconLibrary: "MaterialCommunityIcons",
    link: "/",
  },
  {
    icon: "shield-check-outline",
    text: "Privacy",
    description: "How and when your location is shared",
    iconLibrary: "MaterialCommunityIcons",
  },
];

const permissionSection: PermissionsProps[] = [
  {
    id: "location",
    title: "Location",
    description: "Set permission to share location during emergencies",
    icon: "location-pin",
    iconLibrary: "SimpleLineIcons",
  },
  {
    id: "notifications",
    title: "Get Emergency alerts and safety updates",
    description: "",
    icon: "bell-ring-outline",
    iconLibrary: "MaterialCommunityIcons",
  },
  {
    id: "simulate",
    title: "Simulate offline",
    description: "Preview degraded states",
    icon: "wifi-off",
    iconLibrary: "MaterialCommunityIcons",
  },
];

const accountSection: accountSectionProps[] = [
  {
    id: "password",
    title: "Change password",
    icon: "lock",
    iconLibrary: "EvilIcons",
  },
  {
    id: "help",
    title: "Help & FAQ",
    icon: "help",
    iconLibrary: "Ionicons",
  },
  {
    id: "term",
    title: "Terms of service",
    icon: "file-contract",
    iconLibrary: "FontAwesome5",
  },
  {
    id: "policy",
    title: "Privacy policy",
    icon: "policy",
    iconLibrary: "MaterialIcons",
  },
];

const Profile = () => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const { data, isLoading, isError } = useFetchContact();
  const [openPrivacy, setOpenPrivacy] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { mutate, isPending } = useUpdateProfile();
  const [permissions, setPermissions] = useState<Record<string, boolean>>({
    location: false,
    notifications: false,
    simulate: false,
  });

  const togglePermission = (id: string) => {
    setPermissions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const count = data?.length ?? 0;

  const contactsDescription =
    isLoading || isError
      ? "People in your trusted circle"
      : count === 0
        ? "No one in your trusted circle yet"
        : `${count} ${count === 1 ? "person" : "people"} in your trusted circle`;

  const slotsDescription =
    isLoading || isError
      ? `Free plan. ${MAX_CONTACTS} contacts included`
      : count >= MAX_CONTACTS
        ? `Free plan. All ${MAX_CONTACTS} slots used`
        : `Free plan. ${count} of ${MAX_CONTACTS} contacts used`;

  const defaultValues = useMemo(
    () => ({
      full_name: user?.full_name ?? "",
      username: user?.username ?? "",
      email: user?.email ?? "",
    }),
    [user],
  );

  const router = useRouter();

  const handleLogout = async () => {
    console.log("Logout pressed");

    await logout();
    router.replace("/login");

    console.log("Logout completed");
  };

  const handleUpdates = (data: UpdateProfileDTO) => {
    mutate(data, {
      onSuccess: () => setEditProfile(false),
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-5 pt-4 pb-28"
      >
        <View>
          {/* HEADER */}
          <Text className="font-headerMedium text-3xl text-text3">Profile</Text>

          {/* PROFILE CARD */}
          <View className="mt-6 flex-row items-center rounded-2xl border border-[#e1e4e6] bg-white p-4">
            <View className="h-12 w-12 items-center justify-center rounded-full bg-background">
              <Text className="font-headerMedium text-base text-text">
                {user?.full_name
                  ?.split(" ")
                  .slice(0, 2)
                  .map((name) => name[0])
                  .join("")
                  .toUpperCase()}
              </Text>
            </View>

            <View className="ml-3 flex-1">
              <Text className="font-headerMedium text-base text-text3">
                {user?.full_name}
              </Text>

              <Text className="mt-1 font-body text-xs text-text1">
                {user?.email} . {user?.username}
              </Text>
            </View>

            <Pressable
              className="h-9 w-9 items-center justify-center rounded-full border border-[#dfe3e6]"
              onPress={() => setEditProfile(true)}
            >
              <Feather name="edit-2" size={16} color="#1e5975" />
            </Pressable>
          </View>

          {/* SAFETY */}
          <View className="mt-7">
            <Text className="mb-2 px-1 font-bodyMedium text-[10px] uppercase tracking-[2px] text-text1">
              Safety
            </Text>

            <View className="overflow-hidden rounded-2xl border border-[#e1e4e6] bg-white">
              {safetySection.map((s, index) => {
                const description =
                  s.text === "Emergency contacts"
                    ? contactsDescription
                    : s.text === "Contact slots & plan"
                      ? slotsDescription
                      : s.description;

                const row = (
                  <Pressable
                    className={`flex-row items-center p-4 ${
                      index < safetySection.length - 1
                        ? "border-b border-[#edf0f2]"
                        : ""
                    }`}
                    {...(!s.link && {
                      onPress: () => setOpenPrivacy(true),
                    })}
                  >
                    <View className="h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5EE]">
                      {s.iconLibrary === "Ionicons" && (
                        <Ionicons
                          name={s.icon as any}
                          size={19}
                          color="#2F7D5A"
                        />
                      )}

                      {s.iconLibrary === "MaterialCommunityIcons" && (
                        <MaterialCommunityIcons
                          name={s.icon as any}
                          size={19}
                          color="#2F7D5A"
                        />
                      )}
                    </View>

                    <View className="ml-3 flex-1">
                      <Text className="font-bodyMedium text-sm text-text3">
                        {s.text}
                      </Text>

                      {description ? (
                        <Text className="mt-1 font-body text-xs text-text1">
                          {description}
                        </Text>
                      ) : null}
                    </View>
                  </Pressable>
                );

                return s.link ? (
                  <Link key={index} href={s.link as any} asChild>
                    {row}
                  </Link>
                ) : (
                  <View key={index}>{row}</View>
                );
              })}
            </View>
          </View>

          {/* PERMISSIONS */}
          <View className="mt-7">
            <Text className="mb-2 px-1 font-bodyMedium text-[10px] uppercase tracking-[2px] text-text1">
              Permissions
            </Text>

            <View className="overflow-hidden rounded-2xl border border-[#e1e4e6] bg-white">
              {permissionSection.map((p, index) => (
                <View
                  key={p.id}
                  className={`flex-row items-center p-4 ${
                    index < permissionSection.length - 1
                      ? "border-b border-[#edf0f2]"
                      : ""
                  }`}
                >
                  <View className="h-10 w-10 items-center justify-center rounded-xl bg-[#FFF4DE]">
                    {p.iconLibrary === "SimpleLineIcons" && (
                      <SimpleLineIcons
                        name={p.icon as any}
                        size={17}
                        color="#B7791F"
                      />
                    )}

                    {p.iconLibrary === "MaterialCommunityIcons" && (
                      <MaterialCommunityIcons
                        name={p.icon as any}
                        size={19}
                        color="#B7791F"
                      />
                    )}
                  </View>

                  <View className="ml-3 flex-1">
                    <Text className="font-bodyMedium text-sm text-text3">
                      {p.title}
                    </Text>

                    {p.description ? (
                      <Text className="mt-1 font-body text-xs text-text1">
                        {p.description}
                      </Text>
                    ) : null}
                  </View>

                  <Switch
                    value={permissions[p.id]}
                    onValueChange={() => togglePermission(p.id)}
                    trackColor={{
                      false: "#dfe3e6",
                      true: "#22c55e",
                    }}
                    thumbColor="#ffffff"
                  />
                </View>
              ))}
            </View>

            {!permissions.location && (
              <View className="mt-3 rounded-2xl border border-[#ead9b5] bg-[#faf5e8] p-4">
                <Text className="font-bodyMedium text-sm text-text3">
                  Location permission denied
                </Text>

                <Text className="mt-1 font-body text-xs leading-4 text-text1">
                  Your location is used to help your trusted contacts find you
                  during an active emergency. Without it, alerts are sent
                  without a location.
                </Text>
              </View>
            )}
          </View>

          {/* ACCOUNT & SUPPORT */}
          <View className="mt-7">
            <Text className="mb-2 px-1 font-bodyMedium text-[10px] uppercase tracking-[2px] text-text1">
              Account & support
            </Text>

            <View className="overflow-hidden rounded-2xl border border-[#e1e4e6] bg-white">
              {accountSection.map((a, index) => (
                <Pressable
                  key={a.id}
                  onPress={() => setActiveModal(a.id)}
                  className={`flex-row items-center p-4 ${
                    index < accountSection.length - 1
                      ? "border-b border-[#edf0f2]"
                      : ""
                  }`}
                >
                  <View className="h-10 w-10 items-center justify-center rounded-xl bg-[#F0EBF8]">
                    {a.iconLibrary === "EvilIcons" && (
                      <EvilIcons
                        name={a.icon as any}
                        size={23}
                        color="#76559B"
                      />
                    )}

                    {a.iconLibrary === "FontAwesome5" && (
                      <FontAwesome5
                        name={a.icon as any}
                        size={16}
                        color="#76559B"
                      />
                    )}

                    {a.iconLibrary === "Ionicons" && (
                      <Ionicons
                        name={a.icon as any}
                        size={19}
                        color="#76559B"
                      />
                    )}

                    {a.iconLibrary === "MaterialIcons" && (
                      <MaterialIcons
                        name={a.icon as any}
                        size={19}
                        color="#76559B"
                      />
                    )}
                  </View>

                  <Text className="ml-3 flex-1 font-bodyMedium text-sm text-text3">
                    {a.title}
                  </Text>

                  <Ionicons name="chevron-forward" size={17} color="#9AA5AE" />
                </Pressable>
              ))}
            </View>
          </View>

          {/* LOGOUT */}
          <Pressable
            onPress={handleLogout}
            className="mt-6 flex-row items-center justify-center rounded-xl border border-[#e1e4e6] bg-white py-3"
          >
            <MaterialIcons name="logout" size={18} color="#ef4444" />

            <Text className="ml-2 font-bodyMedium text-sm text-red-500">
              Log out
            </Text>
          </Pressable>

          <Text className="mt-4 text-center font-body text-[10px] text-text1">
            Not a replacement for official emergency services
          </Text>

          {/* MODALS */}
          <View>
            {/* TERMS OF SERVICE */}
            <Modal
              visible={activeModal === "term"}
              transparent
              animationType="slide"
              onRequestClose={() => setActiveModal(null)}
            >
              <Pressable
                className="flex-1 justify-end bg-black/30"
                onPress={() => setActiveModal(null)}
              >
                <Pressable className="h-[70%] rounded-t-3xl bg-white px-5 pb-10 pt-7">
                  {/* Header */}
                  <View className="mb-7 flex-row items-center justify-between">
                    <View className="flex-1">
                      <Text className="font-header text-2xl text-text3">
                        Terms of service
                      </Text>

                      <Text className="mt-1 font-body text-xs text-text1">
                        Important information about using Allerta
                      </Text>
                    </View>

                    <View className="h-11 w-11 items-center justify-center rounded-xl bg-[#F0EBF8]">
                      <FontAwesome5
                        name="file-contract"
                        size={19}
                        color="#76559B"
                      />
                    </View>
                  </View>

                  {/* Content */}
                  <View className="rounded-2xl bg-[#F7F5FA] p-4">
                    <View className="mb-3 flex-row items-center">
                      <View className="h-8 w-8 items-center justify-center rounded-lg bg-[#E9E1F2]">
                        <MaterialIcons
                          name="info-outline"
                          size={18}
                          color="#76559B"
                        />
                      </View>

                      <Text className="ml-3 font-bodyMedium text-sm text-text3">
                        About Allerta
                      </Text>
                    </View>

                    <Text className="font-body text-sm leading-5 text-text1">
                      Allerta is a trusted-contact safety layer and does not
                      replace police, ambulance or fire services.
                    </Text>
                  </View>

                  <View className="mt-4 rounded-2xl border border-[#eeeaf3] bg-white p-4">
                    <Text className="font-bodyMedium text-sm text-text3">
                      Emergency delivery
                    </Text>

                    <Text className="mt-2 font-body text-xs leading-5 text-text1">
                      Alert delivery depends on network availability and
                      recipient device settings. Make sure your trusted contacts
                      can receive notifications when needed.
                    </Text>
                  </View>

                  <Pressable
                    onPress={() => setActiveModal(null)}
                    className="mt-auto items-center rounded-xl bg-background py-3.5"
                  >
                    <Text className="font-bodyMedium text-sm text-white">
                      I understand
                    </Text>
                  </Pressable>
                </Pressable>
              </Pressable>
            </Modal>

            {/* HELP & FAQ */}
            <Modal
              visible={activeModal === "help"}
              transparent
              animationType="slide"
              onRequestClose={() => setActiveModal(null)}
            >
              <Pressable
                className="flex-1 justify-end bg-black/30"
                onPress={() => setActiveModal(null)}
              >
                <Pressable className="h-[75%] rounded-t-3xl bg-white px-5 pb-10 pt-7">
                  {/* Header */}
                  <View className="mb-6 flex-row items-center justify-between">
                    <View className="flex-1">
                      <Text className="font-header text-2xl text-text3">
                        Help & FAQ
                      </Text>

                      <Text className="mt-1 font-body text-xs text-text1">
                        Answers to common questions
                      </Text>
                    </View>

                    <View className="h-11 w-11 items-center justify-center rounded-xl bg-[#F0EBF8]">
                      <Ionicons name="help" size={21} color="#76559B" />
                    </View>
                  </View>

                  {/* FAQ 1 */}
                  <View className="rounded-2xl bg-[#F7F5FA] p-4">
                    <View className="flex-row items-start">
                      <View className="h-8 w-8 items-center justify-center rounded-lg bg-[#E9E1F2]">
                        <MaterialCommunityIcons
                          name="alert-circle-outline"
                          size={18}
                          color="#76559B"
                        />
                      </View>

                      <Text className="ml-3 flex-1 font-bodyMedium text-sm leading-5 text-text3">
                        What happens when I press Emergency?
                      </Text>
                    </View>

                    <Text className="mt-3 font-body text-xs leading-5 text-text1">
                      You get 5 seconds to cancel. After that your contacts are
                      notified and your live location starts sharing.
                    </Text>
                  </View>

                  {/* FAQ 2 */}
                  <View className="mt-3 rounded-2xl bg-[#F7F5FA] p-4">
                    <View className="flex-row items-start">
                      <View className="h-8 w-8 items-center justify-center rounded-lg bg-[#E9E1F2]">
                        <MaterialCommunityIcons
                          name="map-marker-radius-outline"
                          size={18}
                          color="#76559B"
                        />
                      </View>

                      <Text className="ml-3 flex-1 font-bodyMedium text-sm leading-5 text-text3">
                        Can contacts see me all the time?
                      </Text>
                    </View>

                    <Text className="mt-3 font-body text-xs leading-5 text-text1">
                      No. They only see your location while an emergency or
                      safety journey is active.
                    </Text>
                  </View>

                  {/* FAQ 3 */}
                  <View className="mt-3 rounded-2xl bg-[#F7F5FA] p-4">
                    <View className="flex-row items-start">
                      <View className="h-8 w-8 items-center justify-center rounded-lg bg-[#E9E1F2]">
                        <MaterialIcons
                          name="local-police"
                          size={18}
                          color="#76559B"
                        />
                      </View>

                      <Text className="ml-3 flex-1 font-bodyMedium text-sm leading-5 text-text3">
                        Does Allerta call the police?
                      </Text>
                    </View>

                    <Text className="mt-3 font-body text-xs leading-5 text-text1">
                      No. Allerta alerts your trusted circle. Always contact
                      official emergency services when needed.
                    </Text>
                  </View>

                  <Pressable
                    onPress={() => setActiveModal(null)}
                    className="mt-auto items-center rounded-xl bg-background py-3.5"
                  >
                    <Text className="font-bodyMedium text-sm text-white">
                      Close
                    </Text>
                  </Pressable>
                </Pressable>
              </Pressable>
            </Modal>

            {/* PRIVACY POLICY */}
            <Modal
              visible={activeModal === "policy"}
              transparent
              animationType="slide"
              onRequestClose={() => setActiveModal(null)}
            >
              <Pressable
                className="flex-1 justify-end bg-black/30"
                onPress={() => setActiveModal(null)}
              >
                <Pressable className="h-[70%] rounded-t-3xl bg-white px-5 pb-10 pt-7">
                  {/* Header */}
                  <View className="mb-7 flex-row items-center justify-between">
                    <View className="flex-1">
                      <Text className="font-header text-2xl text-text3">
                        Privacy policy
                      </Text>

                      <Text className="mt-1 font-body text-xs text-text1">
                        How Allerta handles your information
                      </Text>
                    </View>

                    <View className="h-11 w-11 items-center justify-center rounded-xl bg-[#F0EBF8]">
                      <MaterialIcons name="policy" size={21} color="#76559B" />
                    </View>
                  </View>

                  {/* Privacy Content */}
                  <View className="rounded-2xl bg-[#F7F5FA] p-4">
                    <View className="mb-3 flex-row items-center">
                      <View className="h-8 w-8 items-center justify-center rounded-lg bg-[#E9E1F2]">
                        <MaterialIcons
                          name="storage"
                          size={17}
                          color="#76559B"
                        />
                      </View>

                      <Text className="ml-3 font-bodyMedium text-sm text-text3">
                        What we store
                      </Text>
                    </View>

                    <Text className="font-body text-xs leading-5 text-text1">
                      We store your profile, trusted contacts and emergency
                      session records.
                    </Text>
                  </View>

                  <View className="mt-3 rounded-2xl bg-[#F7F5FA] p-4">
                    <View className="mb-3 flex-row items-center">
                      <View className="h-8 w-8 items-center justify-center rounded-lg bg-[#E9E1F2]">
                        <MaterialCommunityIcons
                          name="map-marker-outline"
                          size={18}
                          color="#76559B"
                        />
                      </View>

                      <Text className="ml-3 font-bodyMedium text-sm text-text3">
                        Location data
                      </Text>
                    </View>

                    <Text className="font-body text-xs leading-5 text-text1">
                      Location data is captured only during an active emergency
                      or safety journey and shared only with the contacts you
                      configured.
                    </Text>
                  </View>

                  <Pressable
                    onPress={() => setActiveModal(null)}
                    className="mt-auto items-center rounded-xl bg-background py-3.5"
                  >
                    <Text className="font-bodyMedium text-sm text-white">
                      Done
                    </Text>
                  </Pressable>
                </Pressable>
              </Pressable>
            </Modal>

            {/* CHANGE PASSWORD */}
            {/*
            <Modal
              visible={activeModal === "password"}
              transparent
              animationType="slide"
              onRequestClose={() => setActiveModal(null)}
            >
              <KeyboardAvoidingView
                behavior="padding"
                className="flex-1 justify-end bg-black/30"
              >
                <View className="rounded-t-3xl bg-white px-5 pb-8 pt-6">
                  <Text className="mb-6 font-headerMedium text-base text-text3">
                    Change password
                  </Text>

                  <Form className="" onSubmit={} schema={}>
                    {(methods, submitForm) => (
                      <View>
                        <InputField
                          label="Current password"
                          name="current_password"
                          secureTextEntry
                          control={methods.control}
                          error={methods.formState.errors.current_password}
                        />

                        <InputField
                          secureTextEntry
                          label="New password"
                          name="new_password"
                          control={methods.control}
                          error={methods.formState.errors.new_password}
                        />

                        <InputField
                          secureTextEntry
                          label="Confirm new password"
                          name="confirm_new_password"
                          control={methods.control}
                          error={methods.formState.errors.confirm_new_password}
                        />

                        <Button
                          textClassName="text-white"
                          className="bg-background mt-2"
                          spinnerColor="#ffffff"
                          isLoading={}
                          onPress={}
                          loadingText="Updating..."
                        >
                          Update password
                        </Button>
                      </View>
                    )}
                  </Form>
                </View>
              </KeyboardAvoidingView>
            </Modal>
            */}

            {/* YOUR PRIVACY */}
            <Modal
              visible={openPrivacy}
              transparent
              animationType="slide"
              onRequestClose={() => setOpenPrivacy(false)}
            >
              <Pressable
                className="flex-1 justify-end bg-black/30"
                onPress={() => setOpenPrivacy(false)}
              >
                <Pressable className="h-[70%] rounded-t-3xl bg-white px-5 pb-10 pt-7">
                  {/* Header */}
                  <View className="mb-6 flex-row items-center justify-between">
                    <View className="flex-1">
                      <Text className="font-header text-2xl text-text3">
                        Your privacy
                      </Text>

                      <Text className="mt-1 font-body text-xs text-text1">
                        You're in control of your location data
                      </Text>
                    </View>

                    <View className="h-11 w-11 items-center justify-center rounded-xl bg-[#E8F5EE]">
                      <MaterialCommunityIcons
                        name="shield-check-outline"
                        size={21}
                        color="#2F7D5A"
                      />
                    </View>
                  </View>

                  {/* Privacy List */}
                  <View className="gap-3">
                    {privacyList.map((p) => (
                      <View
                        key={p.title}
                        className="flex-row items-center rounded-2xl bg-[#F5F8F6] px-4 py-4"
                      >
                        <View className="h-10 w-10 items-center justify-center rounded-xl bg-[#E1F0E7]">
                          <MaterialCommunityIcons
                            name={p.icon as any}
                            size={18}
                            color="#2F7D5A"
                          />
                        </View>

                        <Text className="ml-3 flex-1 font-bodyMedium text-sm leading-5 text-text3">
                          {p.title}
                        </Text>
                      </View>
                    ))}
                  </View>

                  <Pressable
                    onPress={() => setOpenPrivacy(false)}
                    className="mt-auto items-center rounded-xl bg-background py-3.5"
                  >
                    <Text className="font-bodyMedium text-sm text-white">
                      Done
                    </Text>
                  </Pressable>
                </Pressable>
              </Pressable>
            </Modal>

            {/* Edit profile */}
            <Modal
              visible={editProfile}
              transparent
              animationType="slide"
              onRequestClose={() => setEditProfile(false)}
            >
              <KeyboardAvoidingView
                behavior="padding"
                className="flex-1 justify-end bg-black/30"
              >
                <View className="rounded-t-3xl bg-white px-5 pb-8 pt-6">
                  <Text className="font-headerMedium text-base text-text3">
                    Edit profile
                  </Text>
                  <Text className="mb-6 mt-1 font-body text-xs text-text1">
                    Your username is how other Allerta users add you
                  </Text>

                  <Form
                    onSubmit={handleUpdates}
                    schema={UpdateProfileSchema}
                    defaultValues={defaultValues}
                  >
                    {(methods, submitForm) => (
                      <View>
                        <InputField
                          label="Full name"
                          name="full_name"
                          control={methods.control}
                          error={methods.formState.errors.full_name}
                        />
                        <InputField
                          label="Username"
                          name="username"
                          control={methods.control}
                          error={methods.formState.errors.username}
                        />
                        <InputField
                          label="Email"
                          name="email"
                          control={methods.control}
                          error={methods.formState.errors.email}
                        />

                        <Button
                          textClassName="text-white"
                          className="bg-background mt-2"
                          spinnerColor="#ffffff"
                          isLoading={isPending}
                          onPress={submitForm}
                          loadingText="Saving..."
                        >
                          Save changes
                        </Button>
                      </View>
                    )}
                  </Form>
                </View>
              </KeyboardAvoidingView>
            </Modal>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;