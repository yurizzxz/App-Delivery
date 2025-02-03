import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";
import Button from "../_components/Button";
import Header from "../_components/Header";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  onSnapshot,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { useRouter } from "expo-router";

const statusBarHeight: number = Constants.statusBarHeight;

type CartItem = {
  id: string;
  number: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageSrc: string;
};

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("Usuário não está autenticado.");
      setLoading(false);
      return;
    }

    const db = getFirestore();
    const userCartRef = doc(db, "carts", user.uid);

    const unsubscribe = onSnapshot(userCartRef, (snapshot) => {
      if (snapshot.exists()) {
        const cartData = snapshot.data();
        setCartItems(cartData?.items || []);
      } else {
        console.warn("Nenhum produto adicionado ao carrinho.");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleRemoveItem = async (id: string) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getFirestore();
      const userCartRef = doc(db, "carts", user.uid);

      const itemToRemove = cartItems.find((item) => item.id === id);
      if (itemToRemove) {
        await updateDoc(userCartRef, {
          items: arrayRemove(itemToRemove),
        });
      }
    }
  };

  const handleIncreaseQuantity = async (id: string) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);

    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getFirestore();
      const userCartRef = doc(db, "carts", user.uid);

      const itemToUpdate = updatedCartItems.find((item) => item.id === id);
      if (itemToUpdate) {
        await updateDoc(userCartRef, {
          items: arrayRemove(cartItems.find((item) => item.id === id)),
        });

        await updateDoc(userCartRef, {
          items: arrayUnion(itemToUpdate),
        });
      }
    }
  };

  const handleDecreaseQuantity = async (id: string) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) return;

    const db = getFirestore();
    const userCartRef = doc(db, "carts", user.uid);

    const itemToUpdate = cartItems.find((item) => item.id === id);

    if (!itemToUpdate) return;

    if (itemToUpdate.quantity > 1) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCartItems(updatedCartItems);

      await updateDoc(userCartRef, {
        items: arrayRemove(itemToUpdate),
      });

      await updateDoc(userCartRef, {
        items: arrayUnion({
          ...itemToUpdate,
          quantity: itemToUpdate.quantity - 1,
        }),
      });
    } else {
      const updatedCartItems = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedCartItems);

      await updateDoc(userCartRef, {
        items: arrayRemove(itemToUpdate),
      });
    }
  };

  const handleGoToCheckout = () => {
    router.push({
      pathname: "../checkout",
      params: { cartItems: JSON.stringify(cartItems), totalAmount },
    });
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View className="flex-row items-center mb-2 p-3 bg-white rounded-lg" >
      <Image source={{ uri: item.imageSrc }} className="w-28 h-28 rounded-xl mr-4" />
      <View className="flex-1">
        <Text className="text-xl text-black font-bold">
          <Text className="text-red-600 font-bold">{item.number}</Text>{item.name}
        </Text>
        <Text className="text-sm text-gray-500 my-2">{item.description}</Text>
        <Text className="text-2xl font-bold text-black">R$ {item.price}</Text>
        <View className="flex-row items-center mt-2">
          <TouchableOpacity
            onPress={() => handleDecreaseQuantity(item.id)}
            className="bg-gray-200 p-2 rounded-md"
          >
            <AntDesign name="minus" size={16} color="black" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-black mx-4">{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => handleIncreaseQuantity(item.id)}
            className="bg-gray-200 p-2 rounded-md"
          >
            <AntDesign name="plus" size={16} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleRemoveItem(item.id)}
        className="bg-red-600 p-3 absolute right-0 bottom-0 rounded-br-xl"
      >
        <AntDesign name="delete" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

  const totalAmount: string = cartItems
    .reduce(
      (sum: number, item: CartItem): number =>
        sum + parseFloat(item.price as unknown as string) * item.quantity,
      0
    )
    .toFixed(2);

  const handleGoToFoods = () => {
    router.push("../foods/cardapio");
  };

  return (
    <View className="flex-1 bg-gray-100" style={{ marginTop: statusBarHeight }}>
      <View className="flex-1 p-3">
        <Header title="Carrinho" />

        {loading ? (
          <Text className="text-center mt-5">Carregando...</Text>
        ) : cartItems.length === 0 ? (
          <View>
            <Text className="mb-5">Seu carrinho está vazio.</Text>
            <Button onPress={handleGoToFoods} title="Ir para cardápio" />
          </View>
        ) : (
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>

      <View className="mt-5 p-5 rounded-lg bg-white border-t border-gray-300">
        {cartItems.length > 0 && (
          <>
            <Text className="text-2xl font-bold text-black mb-4">
              Total a pagar: R$ {totalAmount}
            </Text>
            <Button onPress={handleGoToCheckout} title="Finalizar compra" />
          </>
        )}
      </View>
    </View>
  );
}
