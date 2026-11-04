import { View, Text } from "react-native";
import React from "react";

type Contactstatus = "Unnotified" | "Notified" | "Seen";

interface Contact {
  id: string;
  fullName: string;
  status: Contactstatus;
}
interface contactStatusCardProps {
  contacts: Contact[];
}

const STATUS_INFO: Record<
  Contactstatus,
  { message: string; badge: string; badgeText: string }
> = {
  Unnotified: {
    message: "Notification waiting to be sent",
    badge: "bg-gray-100",
    badgeText: "text-gray-600",
  },
  Notified: {
    message: "Push notification sent",
    badge: "bg-blue-50",
    badgeText: "text-blue-700",
  },
  Seen: {
    message: "Notification has been seen",
    badge: "bg-green-50",
    badgeText: "text-green-700",
  },
};

const AVATAR_COLORS = [
  { bg: "bg-red-100", text: "text-red-700" },
  { bg: "bg-blue-100", text: "text-blue-700" },
  { bg: "bg-green-100", text: "text-green-700" },
  { bg: "bg-purple-100", text: "text-purple-700" },
  { bg: "bg-amber-100", text: "text-amber-700" },
  { bg: "bg-teal-100", text: "text-teal-700" },
];

const getAvatarColor = (name: string) => {
  const hash = [...name].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function ContactStatusCard({
  contacts,
}: contactStatusCardProps) {
  return (
    <View className="rounded-2xl bg-white px-4">
      {contacts.map((contact, i) => {
        const info = STATUS_INFO[contact.status];
        const avatar = getAvatarColor(contact.fullName);

        return (
          <View
            key={contact.id}
            className={`flex-row items-center gap-3 py-3 ${
              i !== contacts.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <View
              className={`h-10 w-10 items-center justify-center rounded-full ${avatar.bg}`}
            >
              <Text className={`font-headerMedium text-sm ${avatar.text}`}>
                {getInitials(contact.fullName)}
              </Text>
            </View>

            <View className="flex-1">
              <Text className="font-bodyMedium text-sm text-gray-900">
                {contact.fullName}
              </Text>
              <Text className="font-body text-xs text-gray-500">
                {info.message}
              </Text>
            </View>

            <View className={`rounded-full px-2.5 py-1 ${info.badge}`}>
              <Text className={`font-bodyMedium text-xs ${info.badgeText}`}>
                {contact.status}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}
