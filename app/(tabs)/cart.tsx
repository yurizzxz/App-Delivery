import React, { useState } from "react";
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

const statusBarHeight: number = Constants.statusBarHeight;

type CartItem = {
  id: string;
  number: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
};

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      number: 22,
      name: "Pizza Margherita",
      description: "Delicioso sanduíche de frango com queijo",
      price: 30,
      quantity: 1,
      image: "https://via.placeholder.com/80",
    },
    {
      id: "2",
      number: 22,
      name: "Hambúrguer",
      description: "Delicioso sanduíche de frango com queijo",
      price: 20,
      quantity: 2,
      image: "https://via.placeholder.com/80",
    },
    {
      id: "3",
      number: 22,
      name: "Coca-Cola 1L",
      description: "Delicioso sanduíche de frango com queijo",
      price: 10,
      quantity: 1,
      image: "https://via.placeholder.com/80",
    },
  ]);

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleIncreaseQuantity = (id: string) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (id: string) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}><Text style={{color: "#dd0000"}}>{item.number}</Text> {item.name}</Text>
        <Text style={styles.itemDescription}>R$ {item.description}</Text>
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
      <TouchableOpacity onPress={() => handleRemoveItem(item.id)} style={styles.removeButton}>
        <AntDesign name="delete" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <ScrollView
        style={[styles.container, { marginTop: statusBarHeight, paddingTop: 30 }]}
      >
        <Text style={styles.title}>Carrinho de Compras</Text>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.cartList}
        />
      </ScrollView>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Total a pagar: R${" "}
          {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
        </Text>
        <Button onPress={() => {}} title="Finalizar compra" >
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
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
    borderBottomEndRadius: 20
  },
  totalContainer: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: "#ff0000",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  checkoutButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
