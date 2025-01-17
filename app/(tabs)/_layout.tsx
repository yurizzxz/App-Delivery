import { Tabs } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: {
          height: 60,
          paddingTop: 6,
        },
        tabBarActiveTintColor: '#d30000', 
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={25} color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 12, paddingTop: 3 }}>Home</Text>
          ),
        }}
      />

      <Tabs.Screen
        name="coupons"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <AntDesign name="tag" size={25} color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 12, paddingTop: 3 }}>
              Cupons
            </Text>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={25} color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 12, paddingTop: 3 }}>Perfil</Text>
          ),
        }}
      />
    </Tabs>
  );
}
