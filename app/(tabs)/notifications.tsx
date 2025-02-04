import React from "react";
import { View, Text, FlatList } from "react-native";
import Header from "../_components/Header";
import Container from "../_components/Container";


const notifications = [
  {
    id: "3",
    title: "Seu pedido foi enviado",
    message: "Seu pedido está a caminho. Chegando em breve!",
  },
];

export default function NotificationsScreen() {
  const renderItem = ({ item }: { item: typeof notifications[0] }) => (
    <View className="bg-white p-4 mb-2 rounded-lg shadow">
      <Text className="text-xl font-bold text-gray-900">{item.title}</Text>
      <Text className="text-base text-gray-600 mt-2">{item.message}</Text>
    </View>
  );

  return (
    <Container>
      <Header title="Notificações" />
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </Container>
  );
}
