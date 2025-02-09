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
  imageSrc: any;
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
  status: string;
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
      <Greeting greeting="Bem vindo," title={userName || "usuário"} />

      <SearchInput placeholder="O que você procura?" onChangeText={() => {}} />

      <View className="gap-3 mt-3">
        <View>
          <Text className="text-2xl font-bold">Mais Vendidos</Text>
          <Text className="text-sm text-gray-500">Veja os lanches que mais saíram recentemente!</Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2.5">
            {cards
              .filter((card) => card.status.toLowerCase() === "maisvendido")
              .map((card) => (
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

      <View className="h-2 my-3"></View>

      <View className="gap-3 mt-2 ">
        <View>
          <Text className="text-2xl font-bold">Cardápio</Text>
          <Text className="text-sm text-gray-500">Selecione uma de nossas opções de cardápio</Text>
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
              <Text className="text-md text-center font-bold">
                {category.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View className="h-2 my-3"></View>

      <View className="gap-3 mt-3">
        <View>
          <Text className="text-2xl font-bold">Novos Lanches</Text>
          <Text className="text-sm text-gray-500">Veja os lanches recentemente adicionados da casa!</Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2.5">
            {cards
              .filter((card) => card.status.toLowerCase() === "destaque")
              .map((card) => (
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

        <View className="h-2 my-3"></View>
      </View>
    </Container>
  );
}
