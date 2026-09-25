import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#1e5975",
        tabBarInactiveTintColor: "#6b7280",

        tabBarStyle: {
          position: "absolute",
          bottom: 18,
          left: 20,
          right: 20,

          height: 68,
          paddingTop: 8,
          paddingBottom: 8,

          backgroundColor: "transparent",

          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.6)",
          borderRadius: 24,

          elevation: 0,

          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.08,
          shadowRadius: 16,

          overflow: "hidden",
        },

        tabBarBackground: () => (
          <BlurView
            intensity={70}
            tint="light"
            style={{
              flex: 1,
              borderRadius: 24,
              overflow: "hidden",
            }}
          />
        ),

        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: "Manrope_600SemiBold",
          marginTop: 2,
        },

        tabBarItemStyle: {
          paddingVertical: 2,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="contact"
        options={{
          title: "Contact",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="history-toggle-off"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

export default TabsLayout;