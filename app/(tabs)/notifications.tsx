import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Header from "../_components/Header";
import Constants from "expo-constants";

const statusBarHeight: number = Constants.statusBarHeight;

const notifications = [
  {
    id: "1",
    title: "Promoção de Lanches!",
    message: "Compre um lanche e ganhe 50% de desconto no segundo.",
  },
  {
    id: "2",
    title: "Novo produto disponível",
    message: "Acabamos de adicionar novos itens ao nosso menu. Confira!",
  },
  {
    id: "3",
    title: "Seu pedido foi enviado",
    message: "Seu pedido está a caminho. Chegando em breve!",
  },

];

export default function NotificationsScreen() {
  const renderItem = ({ item }: { item: typeof notifications[0] }) => (
    <View style={styles.notification}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationMessage}>{item.message}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { flex: 1, marginTop: statusBarHeight }]}>
      <Header title="Notificações" />
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f5f5f5",
  },
  flatListContainer: {
    paddingBottom: 15,
  },
  notification: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  notificationMessage: {
    fontSize: 14,
    color: "#777",
    marginVertical: 5,
  },
});
