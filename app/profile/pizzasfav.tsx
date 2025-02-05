import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Text, ActivityIndicator, Alert, Pressable } from "react-native";
import Card from "@/app/_components/Card";
import Header from "@/app/_components/Header";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { fetchCards } from "../services/firebaseConfig"; 

const statusBarHeight: number = Constants.statusBarHeight;

export default function PizzaFavScreen() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) {
        Alert.alert("Erro", "Você precisa estar logado para ver os favoritos.");
        setLoading(false);
        return;
      }

      const db = getFirestore();
      const userFavoritesRef = doc(db, "users", user.uid); 
      try {
        const docSnapshot = await getDoc(userFavoritesRef);
        if (docSnapshot.exists()) {
          const favoritesIds = docSnapshot.data().favorites || [];
          const allCards = await fetchCards();
          const userFavorites = allCards.filter((card: any) =>
            favoritesIds.includes(card.id) && card.category === "pizza"
          );
          setFavorites(userFavorites);
        } else {
          Alert.alert("Erro", "Usuário não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao carregar favoritos:", error);
        Alert.alert("Erro", "Não foi possível carregar os favoritos.");
      }
      setLoading(false);
    };

    loadFavorites();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { marginTop: statusBarHeight }]}>
      <View style={styles.header}>
        <AntDesign
          name="arrowleft"
          onPress={() => router.back()} 
          size={24}
          color="#000"
          style={styles.arrowIcon}
        />
        <Header title="Pizzas Favoritas" />
      </View>

      {favorites.length === 0 ? (
        <Text style={styles.noFavoritesText}>Você não tem lanches favoritos ainda.</Text>
      ) : (
        <View style={styles.cardContainer}>
          {favorites.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => router.push(`/foods/${item.id}`)}
            >
              <Card
                imageSrc={item.imageSrc}
                name={item.name}
                description={item.description}
                price={item.price}
              />
            </Pressable>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", 
    marginBottom: 10,
  },
  arrowIcon: {
    marginRight: 20, 
    marginTop: 5,
  },
  cardContainer: {
    gap: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  noFavoritesText: {
    fontSize: 18,
    color: "#888",
  },
});
