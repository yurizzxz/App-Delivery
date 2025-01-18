import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import Card from "@/app/_components/Card";
import Header from "@/app/_components/Header";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { fetchCards } from "../services/firebaseConfig";

const statusBarHeight: number = Constants.statusBarHeight;

interface CardType {
  id: string;
  imageSrc: string;
  name: string;
  description: string;
  price: string;
  category: string;
}

export default function PizzaScreen() {
  const router = useRouter();
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCards = async () => {
      const fetchedCards = await fetchCards();
      setCards(fetchedCards.filter(card => card.category === "pizza"));
      setLoading(false);
    };
    getCards();
  }, []);

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
        <Header title="Pizzas" />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <View style={styles.cardContainer}>
          {cards.map((card) => (
            <Card
              key={card.id}
              imageSrc={card.imageSrc}
              name={card.name}
              description={card.description}
              price={card.price}
            />
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
    gap: 15,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
