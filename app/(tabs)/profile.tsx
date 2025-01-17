import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import Button from "../_components/Button";
import Constants from "expo-constants";
import Header from "../_components/Header";
import { useRouter } from "expo-router";

const statusBarHeight: number = Constants.statusBarHeight;

export default function Profile() {
  const router = useRouter();
  return (
    <View style={[styles.container, { marginTop: statusBarHeight }]}>
      <Header title="Perfil" />
      <View style={styles.profileContainer}>
        <View style={styles.avatar} />
        <View>
          <Text style={styles.username}>Usuário</Text>

          <Text style={styles.email}>email@gmail.com</Text>
          <Button onPress={() => {}} title="Editar informações" />
        </View>
      </View>

      <View
        style={{ height: 1, backgroundColor: "#1e1e1e1d", marginVertical: 20 }}
      ></View>

      {/* Options */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          Status do pedido:{" "}
          <Text style={styles.statusHighlight}>Em produção</Text>
        </Text>
        <Text style={styles.statusText}>
          Previsão de entrega: <Text style={styles.statusHighlight}>21h40</Text>
        </Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push("../profileOptions/pedidos")} style={styles.optionButton}>
          <Text style={styles.optionText}>Histórico de pedidos</Text>
        </TouchableOpacity>
        <View style={styles.favoritesContainer}>
          <TouchableOpacity onPress={() => router.push("../profileOptions/pizzasfav")} style={styles.favoriteButton}>
            <Text style={styles.favoriteText}>Pizzas Favoritas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("../profileOptions/lanchesfav")} style={styles.favoriteButton}>
            <Text style={styles.favoriteText}>Lanches Favoritos</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.whatsappButton}>
          <Text style={styles.whatsappText}>Peça via WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
    flexDirection: "row",
    gap: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ccc",
    marginBottom: 10,
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  email: {
    fontSize: 16,
    color: "#888",
    marginBottom: 10,
  },

  statusContainer: {
    marginTop: 15,
    marginBottom: 30,
  },
  statusText: {
    fontSize: 17,
    color: "#000",
  },
  statusHighlight: {
    color: "#ff0000",
  },
  optionButton: {
    backgroundColor: "#ECECEC",
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  optionText: {
    textAlign: "center",
    fontSize: 18,
    color: "#000",
  },
  favoritesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 10,
  },
  favoriteButton: {
    flex: 1,
    backgroundColor: "#ECECEC",
    borderRadius: 5,
    paddingVertical: 15,
  },
  favoriteText: {
    textAlign: "center",
    fontSize: 18,
    color: "#000",
  },
  whatsappButton: {
    backgroundColor: "#ECECEC",
    borderRadius: 5,
    paddingVertical: 15,
  },
  whatsappText: {
    textAlign: "center",
    fontSize: 18,
    color: "#000",
  },
});
