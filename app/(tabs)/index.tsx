import { Image, View, Text, ScrollView, Pressable } from "react-native";
import Constants from "expo-constants";
import Greeting from "../_components/Greeting";
import Card from "../_components/Card";
import SearchInput from "../_components/Search";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { fetchCards } from "../services/firebaseConfig";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import Container from "../_components/Container";

const statusBarHeight: number = Constants.statusBarHeight;

const pizzaImage = require("../_assets/pizza.jpeg");
const bebidaImage = require("../_assets/refrigerante.jpg");
const lancheImage = require("../_assets/hamburguer.jpg");

type Category = {
  name: string;
  imageSrc: any;  // Alterado para 'any', já que você está usando require para carregar as imagens locais
  route: string;
};

const categories: Category[] = [
  {
    name: "Lanches",
    imageSrc: lancheImage,
    route: "../foods/lanches",
  },
  {
    name: "Pizzas",
    imageSrc: pizzaImage,
    route: "../foods/pizzas",
  },
  {
    name: "Bebidas",
    imageSrc: bebidaImage,
    route: "../foods/bebidas",
  },
];

type CardType = {
  id: string;
  imageSrc: string;
  name: string;
  description: string;
  price: string;
};

export default function HomeScreen() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadCards = async () => {
      const fetchedCards = await fetchCards();
      setCards(fetchedCards);
    };

    loadCards();
  }, []);

  useEffect(() => {
    const getUserData = () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const db = getFirestore();
        const userDocRef = doc(db, "users", user.uid);

        const unsubscribeUser = onSnapshot(userDocRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            setUserName(docSnapshot.data().name);
          }
        });

        return () => unsubscribeUser();
      }
    };

    getUserData();
  }, []);

  return (
    <Container>
      <Greeting
        greeting="Bem vindo,"
        title={userName || "usuário"}
      />

      <SearchInput placeholder="O que você procura?" onChangeText={() => {}} />

      <View className="gap-2 mt-2">
        <View>
          <Text className="text-2xl font-bold">Cardápio</Text>
        </View>
        <View className="flex-row gap-2">
          {categories.map((category, index) => (
            <Pressable
              key={index}
              className="rounded-xl mb-2"
              onPress={() => router.push(category.route)}
            >
              <Image
                source={category.imageSrc} 
                className="w-24 h-24 rounded-full mb-1 object-cover"
              />
              <Text className="text-md font-bold">{category.name}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View className="h-2 my-3"></View>

      {/* Cards */}
      <View className="gap-2">
        <View>
          <Text className="text-2xl font-bold">Mais Vendidos</Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2.5">
            {cards.map((card) => (
              <Pressable
                key={card.id}
                className="rounded-xl"
                onPress={() => router.push(`./foods/${card.id}`)}
              >
                <Card
                  imageSrc={card.imageSrc}
                  name={card.name}
                  description={card.description}
                  price={card.price}
                />
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </Container>
  );
}
