import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, arrayUnion } from "firebase/firestore";

interface CardProps {
  imageSrc: string;
  name: string;
  description: string;
  price: string;
}

export default function Card({
  imageSrc,
  name,
  description,
  price,
}: CardProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

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
      await setDoc(
        userCartRef,
        {
          items: arrayUnion({
            name,
            imageSrc,
            price: parseFloat(price),
            description,
            quantity: 1,
          }),
        },
        { merge: true }
      );

      Alert.alert("Sucesso", "Item adicionado ao carrinho!");
    } catch (error) {
      console.error("Erro ao adicionar item ao carrinho: ", error);
      Alert.alert("Erro", "Não foi possível adicionar o item ao carrinho.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <View
      className="bg-white rounded-2xl overflow-hidden w-[172] h-[215]"
    >
      <Image source={{ uri: imageSrc }} style={{ resizeMode: "contain", width: "100%", height: 150 }} />
      <View className="px-3 pb-5 flex-1 justify-between">
        <Text className="text-xl font-bold">{name}</Text>
        <Text className="text-sm text-gray-500  pr-5">
          {description}
        </Text>
        <View className="items-start">
          <Text className="text-2xl text-black font-bold">R${price}</Text>
        </View>
      </View>
      <TouchableOpacity
        className="absolute bottom-0 items-center justify-center right-0 bg-[#ff0000] p-2"
        onPress={handleAddToCart}
        disabled={isAdding}
      >
        <AntDesign
          name="shoppingcart"
          size={22}
          color="white"
          className="righ"
        />
      </TouchableOpacity>
    </View>
  );
}
