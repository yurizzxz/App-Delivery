import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Button from "../_components/Button";
import Constants from "expo-constants";
import Header from "../_components/Header";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Container from "../_components/Container";

const statusBarHeight: number = Constants.statusBarHeight;

export default function Profile() {
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        setUserId(user.uid);
        const db = getFirestore();

        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
          setUserEmail(userDoc.data().email);
        }
      }
    };

    getUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      router.replace("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };
  const router = useRouter();

  return (
    <Container >
      <Header title="Perfil" />
      <View className="flex flex-row items-center mb-5 gap-7">
        <View style={styles.avatar} />
        <View>
          <Text className="text-2xl font-bold text-black">{userName}</Text>
          <Text className="text-lg text-gray-600 mb-2">{userEmail}</Text>
          <Button
            onPress={() => userId && router.push(`../profile/${userId}`)}
            title="Editar informações"
          />
        </View>
      </View>

      <View className="h-[1] my-2.5 " />

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
          onPress={() => router.push("../profile/pedidos")}
          className="px-5 py-6 rounded-xl"
        >
          <View className="flex flex-row items-center gap-3">
            <AntDesign name="hearto" size={20} color="#000" />
            <Text className="text-lg text-black">Pizzas Favoritas</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("../profile/pedidos")}
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
          className="px-5 py-6  rounded-xl"
        >
          <View className="flex flex-row items-center gap-3">
            <AntDesign name="logout" size={20} color="#ff0000" />
            <Text className="text-lg text-red-600">Sair</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ccc",
    marginBottom: 0,
  },
});
