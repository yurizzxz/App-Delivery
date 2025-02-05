import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Button from "../_components/Button";
import Constants from "expo-constants";
import Header from "../_components/Header";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import useUserProfile from "../_hooks/useUserProfile";
import { signOut, getAuth } from "firebase/auth";
import Container from "../_components/Container";

const statusBarHeight: number = Constants.statusBarHeight;

export default function Profile() {
  const defaultProfileImageUri =
    "https://www.w3schools.com/w3images/avatar2.png";
  const profile = useUserProfile();
  const { userName, userEmail, userId } = profile;
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      router.replace("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <Container>
      <Header title="Perfil" />
      <View>
        <View className="flex flex-row items-center mb-5 gap-7">
          <View>
            <Image
              source={{ uri: defaultProfileImageUri }}
              className="w-32 h-32 rounded-full"
            />
          </View>
          <View>
            <Text className="text-2xl font-bold text-black">{userName}</Text>
            <Text className="text-lg text-gray-600 mb-2">{userEmail}</Text>
            <Button
              onPress={() => userId && router.push(`../profile/${userId}`)}
              title="Editar informações"
            />
          </View>
        </View>

        <View className="h-[1] my-2.5" />

        <View className="flex flex-col gap-1 bg-[#ECECEC] border border-[#dddddd] rounded-xl">
          <TouchableOpacity
            onPress={() => router.push("../profile/pedidos")}
            className="px-5 py-6 rounded-xl"
          >
            <View className="flex flex-row items-center gap-3">
              <AntDesign name="clockcircle" size={20} color="#000" />
              <Text className="text-lg text-black">Histórico de pedidos</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("../profile/pizzasfav")}
            className="px-5 py-6 rounded-xl"
          >
            <View className="flex flex-row items-center gap-3">
              <AntDesign name="hearto" size={20} color="#000" />
              <Text className="text-lg text-black">Pizzas Favoritas</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("../profile/lanchesfav")}
            className="px-5 py-6 rounded-xl"
          >
            <View className="flex flex-row items-center gap-3">
              <AntDesign name="heart" size={20} color="#000" />
              <Text className="text-lg text-black">Lanches Favoritos</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("../profile/pedidos")}
            className="px-5 py-6 rounded-xl"
          >
            <View className="flex flex-row items-center gap-3">
              <AntDesign name="message1" size={20} color="#000" />
              <Text className="text-lg text-black">Peça via WhatsApp</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogout}
            className="px-5 py-6 rounded-xl"
          >
            <View className="flex flex-row items-center gap-3">
              <AntDesign name="logout" size={20} color="#ff0000" />
              <Text className="text-lg text-red-600">Sair</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className="mt-2">
          <Text className="text-lg mt-2" style={{ color: "#999" }}>
            Versão 1.0.0
          </Text>
          <Text className="text-lg mt-2" style={{ color: "#999" }}>
            Lanchonete
          </Text>
          <Text className="" style={{ color: "#999" }}>Rua Seu Endereço n°58</Text>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 0,
  },
});
