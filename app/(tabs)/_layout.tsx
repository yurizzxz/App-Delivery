import { Tabs } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

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
        tabBarActiveTintColor: '#ff0000',
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
            <Text style={{ color, fontSize: 12, paddingTop: 3 }}>Cupons</Text>
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <AntDesign name="shoppingcart" size={30} color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 12, paddingTop: 3 }}>
              Carrinho
            </Text>
          ),
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="notifications" size={25} color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 12, paddingTop: 3 }}>
              Notificações
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
