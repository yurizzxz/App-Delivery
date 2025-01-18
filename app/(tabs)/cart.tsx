import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";
import Button from "../_components/Button";
import Header from "../_components/Header";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, onSnapshot, updateDoc, arrayRemove, arrayUnion, setDoc } from "firebase/firestore";

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
        console.warn("Nenhum prouduto adicionado ao carrinho.");
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
        items: arrayUnion({ ...itemToUpdate, quantity: itemToUpdate.quantity - 1 }),
      });
    } else {
      const updatedCartItems = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedCartItems);
  
      await updateDoc(userCartRef, {
        items: arrayRemove(itemToUpdate),
      });
    }
  };

  const handleCheckout = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (!user) {
      console.error("Usuário não autenticado.");
      return;
    }
  
    const db = getFirestore();
    const userCartRef = doc(db, "carts", user.uid); // Referência do carrinho
    const orderId = `${user.uid}-${new Date().getTime()}`; // Gerando um ID único com timestamp
    const ordersRef = doc(db, "pedidos", orderId); // Criando o novo documento na coleção "pedidos"
  
    try {
      // Criando o pedido
      await setDoc(ordersRef, {
        userId: user.uid,
        items: cartItems,
        totalAmount: totalAmount,
        orderDate: new Date(),
      });
  
      // Limpar os itens do carrinho após a compra
      await updateDoc(userCartRef, {
        items: [], // Limpar carrinho
      });
  
      // Confirmação do sucesso
      alert("Pedido efetuado com sucesso!");
  
      // Limpar o estado do carrinho na tela
      setCartItems([]);
    } catch (error) {
      console.error("Erro ao finalizar a compra: ", error);
      alert("Houve um erro ao processar o pedido.");
    }
  };
  

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.imageSrc }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>
          <Text style={{ color: "#ff0000" }}>{item.number}</Text> {item.name}
        </Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemPrice}>R$ {item.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => handleDecreaseQuantity(item.id)}
            style={styles.quantityButton}
          >
            <AntDesign name="minus" size={16} color="black" />
          </TouchableOpacity>
          <Text style={styles.itemQuantity}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => handleIncreaseQuantity(item.id)}
            style={styles.quantityButton}
          >
            <AntDesign name="plus" size={16} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleRemoveItem(item.id)}
        style={styles.removeButton}
      >
        <AntDesign name="delete" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

  const totalAmount: string = cartItems
  .reduce((sum: number, item: CartItem): number => 
    sum + parseFloat(item.price as unknown as string) * item.quantity, 
    0
  )
  .toFixed(2);


  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <ScrollView
        style={[styles.container, { marginTop: statusBarHeight }]}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Header title="Carrinho" />

        {loading ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>Carregando...</Text>
        ) : (
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.cartList}
          />
        )}
      </ScrollView>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Total a pagar: R$ {totalAmount}
        </Text>
        <Button onPress={handleCheckout} title="Finalizar compra" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  cartList: {
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 20,
    color: "#000",
  },
  itemDescription: {
    fontSize: 14,
    color: "#999",
    marginVertical: 5,
  },
  itemPrice: {
    fontSize: 23,
    color: "#000",
    fontWeight: "bold",
  },
  itemQuantity: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginHorizontal: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: "#ECECEC",
    padding: 5,
    borderRadius: 5,
  },
  removeButton: {
    backgroundColor: "#ff0000",
    padding: 8,
    position: "absolute",
    right: 0,
    bottom: 0,
    borderBottomEndRadius: 10,
  },
  totalContainer: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderColor: "#1111113d",
    borderTopWidth: 0.5,
  },
  totalText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
});
