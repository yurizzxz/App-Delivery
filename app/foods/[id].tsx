import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  arrayUnion,
  arrayRemove,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { fetchCards } from "../services/firebaseConfig";
import Button from "../_components/Button";

type CardType = {
  id: string;
  imageSrc: string;
  name: string;
  description: string;
  price: string;
};

export default function FoodDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [item, setItem] = useState<CardType | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const auth = getAuth();
  const user = auth.currentUser;

  const checkFavoriteStatus = async () => {
    if (!user) return;
    const db = getFirestore();
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const favorites = userDoc.data().favorites || [];
      setIsFavorite(favorites.includes(id));
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      Alert.alert(
        "Erro",
        "Você precisa estar logado para adicionar ao carrinho."
      );
      return;
    }

    setIsAdding(true);
    const db = getFirestore();
    const userCartRef = doc(db, "carts", user.uid);

    try {
      const userDoc = await getDoc(userCartRef);
      if (userDoc.exists()) {
        await updateDoc(userCartRef, {
          items: arrayUnion({
            name: item?.name,
            imageSrc: item?.imageSrc,
            price: item ? parseFloat(item.price) : 0,
            description: item?.description,
            quantity: quantity,
          }),
        });
      } else {
        await setDoc(
          userCartRef,
          {
            items: [
              {
                name: item?.name,
                imageSrc: item?.imageSrc,
                price: item ? parseFloat(item.price) : 0,
                description: item?.description,
                quantity: quantity,
              },
            ],
          }
        );
      }

      Alert.alert("Sucesso", "Item adicionado ao carrinho!");
    } catch (error) {
      console.error("Erro ao adicionar item ao carrinho: ", error);
      Alert.alert("Erro", "Não foi possível adicionar o item ao carrinho.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleFavorite = async () => {
    if (!user) {
      Alert.alert(
        "Erro",
        "Você precisa estar logado para adicionar aos favoritos."
      );
      return;
    }

    const db = getFirestore();
    const userRef = doc(db, "users", user.uid);

    try {
      await updateDoc(userRef, {
        favorites: arrayUnion(item?.id),
      });

      setIsFavorite(true);

      Alert.alert("Sucesso", "Lanche adicionado aos favoritos.");
    } catch (error) {
      console.error("Erro ao adicionar aos favoritos:", error);
      Alert.alert("Erro", "Não foi possível adicionar aos favoritos.");
    }
  };

  const handleRemoveFavorite = async () => {
    if (!user) {
      Alert.alert(
        "Erro",
        "Você precisa estar logado para remover dos favoritos."
      );
      return;
    }

    const db = getFirestore();
    const userRef = doc(db, "users", user.uid);

    try {
      await updateDoc(userRef, {
        favorites: arrayRemove(item?.id),
      });

      setIsFavorite(false);

      Alert.alert("Sucesso", "Lanche removido dos favoritos.");
    } catch (error) {
      console.error("Erro ao remover dos favoritos:", error);
      Alert.alert("Erro", "Não foi possível remover dos favoritos.");
    }
  };

  useEffect(() => {
    const loadItem = async () => {
      const fetchedCards = await fetchCards();
      const selectedItem = fetchedCards.find((card) => card.id === id);
      setItem(selectedItem || null);
    };

    if (id) {
      loadItem();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      checkFavoriteStatus();
    }
  }, [id]);

  if (!item) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#000"></ActivityIndicator>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      <TouchableOpacity className="absolute top-10 left-2 p-2" onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={24} color="#000" />
      </TouchableOpacity>

      <Image source={{ uri: item.imageSrc }} className="w-full h-[380] object-cover" />

      <View className="flex-1 bg-gray-100 rounded-t-2xl px-4 pt-6">
        <View className="flex-row justify-between items-center">
          <Text className="text-3xl font-bold text-black mb-1">{item.name}</Text>
          <TouchableOpacity onPress={isFavorite ? handleRemoveFavorite : handleFavorite}>
            <AntDesign
              name={isFavorite ? "heart" : "hearto"}
              size={24}
              color={isFavorite ? "#ff0000" : "#000"}
            />
          </TouchableOpacity>
        </View>
        <Text className="text-lg text-gray-600 mt-2 mb-4">Ingredientes</Text>
        <Text className="text-lg text-gray-600 mb-5">{item.description}</Text>
      </View>

      <View className="px-4 py-3 border-t border-gray-300">
        <View className="flex-row justify-between items-center pb-5 pt-1">
          <View>
            <Text className="text-lg font-bold mb-1">Quantidade:</Text>
            <View className="flex-row items-center bg-gray-200 rounded-xl px-3">
              <TouchableOpacity
                className="p-2"
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Text className="text-xl font-bold">-</Text>
              </TouchableOpacity>
              <Text className="mx-3 text-xl font-bold">{quantity}</Text>
              <TouchableOpacity
                className="p-2"
                onPress={() => setQuantity(quantity + 1)}
              >
                <Text className="text-xl font-bold">+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text className="text-lg font-bold mb-1">Preço:</Text>
            <Text className="text-3xl font-bold text-black">R${item.price}</Text>
          </View>
        </View>
        <View>
          <Button title="Adicionar ao carrinho" onPress={handleAddToCart} />
        </View>
      </View>
    </View>
  );
}
