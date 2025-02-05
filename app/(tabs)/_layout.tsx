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
          height: 65,
          borderTopLeftRadius: 45,
          borderTopRightRadius: 45,
          paddingHorizontal: 5
        },
        tabBarActiveTintColor: '#ff0000',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={25} color={color} />
          ),

        }}
      />

      <Tabs.Screen
        name="coupons"
        options={{
          title: "Cupons",
          tabBarIcon: ({ color }) => (
            <AntDesign name="tag" size={25} color={color} />
          ),
          
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: "Carrinho",
          tabBarIcon: ({ color }) => (
            <AntDesign name="shoppingcart" size={30} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notificações",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="notifications" size={25} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={25} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
