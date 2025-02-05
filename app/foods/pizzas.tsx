import React, { useState, useEffect } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import Card from "@/app/_components/Card";
import Header from "@/app/_components/Header";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { fetchCards } from "../services/firebaseConfig";
import Container from "../_components/Container";

const statusBarHeight: number = Constants.statusBarHeight;

interface CardType {
  id: string;
  imageSrc: string;
  name: string;
  description: string;
  price: string;
  category: string;
}

export default function PizzasScreen() {
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
    <Container>
      <View className="flex-row items-center justify-start mb-4">
        <AntDesign
          name="arrowleft"
          onPress={() => router.back()}
          size={24}
          color="#000"
          className="mr-5 mt-1"
        />
        <Header title="Pizzas" />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <View className="justify-between flex-row flex-wrap gap-3">
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
    </Container>
  );
}
