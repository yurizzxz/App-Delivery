import React from "react";
import { useState, useEffect } from "react";
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
import { AntDesign } from "@expo/vector-icons";

import { getAuth, signOut} from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

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
    <View style={[styles.container, { marginTop: statusBarHeight }]}>
      <Header title="Perfil" />
      <View style={styles.profileContainer}>
        <View style={styles.avatar} />
        <View>
          <Text style={styles.username}>{userName}</Text>

          <Text style={styles.email}>{userEmail}</Text>
          <Button
            onPress={() => userId && router.push(`../profile/${userId}`)}
            title="Editar informações"
          />
        </View>
      </View>

      <View
        style={{
          height: 1,
          backgroundColor: "#1e1e1e1d",
          marginTop: 20,
          marginBottom: 20,
        }}
      ></View>

      <View
        style={{
          flexDirection: "column",
          gap: 5,
        }}
      >
        <TouchableOpacity
          onPress={() => router.push("../profile/pedidos")}
          style={styles.optionButton}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
            <AntDesign name="clockcircle" style={{ zIndex: 1}} size={20} color="#000" />
            <Text style={styles.optionText}>Histórico de pedidos</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("../profile/pizzasfav")}
          style={styles.optionButton}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
            <AntDesign name="hearto" style={{ zIndex: 1}} size={20} color="#000" />
            <Text style={styles.optionText}>Pizzas Favoritas</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("../profile/lanchesfav")}
          style={styles.optionButton}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
            <AntDesign name="heart" style={{ zIndex: 1}} size={20} color="#000" />
            <Text style={styles.optionText}>Lanches Favoritos</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("https://api.whatsapp.com/")}
          style={styles.optionButton}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
            <AntDesign name="message1" style={{ zIndex: 1}} size={20} color="#000" />
            <Text style={styles.optionText}>Peça via WhatsApp</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
            <AntDesign name="logout" size={20}  color="#ff0000" />
            <Text style={styles.logoutText}>Sair</Text>
          </View>
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
    marginBottom: 0,
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
    borderRadius: 5,
    paddingVertical: 25,
    paddingHorizontal: 15,
    borderBottomWidth: .5,
    borderColor: "#1e1e1e2f",
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


  logoutButton: {
    borderRadius: 5,
    paddingVertical: 25,
    paddingHorizontal: 15,
    borderBottomWidth: .5,
    borderColor: "#ff00002e",
  },
  logoutText: {
    textAlign: "center",
    fontSize: 18,
    color: "#ff0000",
  },
});
