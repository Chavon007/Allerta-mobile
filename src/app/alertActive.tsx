import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import ContactStatusCard from "@/components/contactStatusCard";
import LocationUpdateCard from "@/components/locationUpdateCard";
export default function alertActive() {
  return (
    <SafeAreaView>
      <View>
        <View>
          <View>
            <Text></Text>
            <Text>Emergency Alert Active</Text>
          </View>
          <Text>Help is being notified</Text>
          <Text>
            Started 4:43 PM · your live location is being shared with your
            trusted circle.
          </Text>
        </View>

        <View>
          <LocationUpdateCard address={} contact={} time={} />
        </View>

        <View>
          <ContactStatusCard
            contacts={[
              { id: "1", fullName: "Sarah Johnson", status: "Notified" },
              { id: "2", fullName: "Michael Brown", status: "Seen" },
              { id: "3", fullName: "Jackson Caleb", status: "Unnotified" },
            ]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
