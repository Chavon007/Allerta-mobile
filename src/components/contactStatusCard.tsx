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
    <View>
      {contacts.map((contact) => {
        const info = STATUS_INFO[contact.status];

        return (
          <View key={contact.id}>
            <Text>{getInitials(contact.fullName)}</Text>
            <View>
              <Text>{contact.fullName}</Text>
              <Text>{info.message}</Text>
            </View>
            <Text>{contact.status}</Text>
          </View>
        );
      })}
    </View>
  );
}
