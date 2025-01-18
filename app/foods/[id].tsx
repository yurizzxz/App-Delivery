import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import Button from "../_components/Button";

type CardType = {
  id: string;
  number: number;
  imageSrc?: string;
  name: string;
  description: string;
  price: string;
};

const cards: CardType[] = [
  {
    id: "1",
    number: 22,
    imageSrc: "https://via.placeholder.com/300",
    name: "X Burguer",
    description: "Pão, 2 hambúrgueres, bacon, cheddar e queijo",
    price: "25,00",
  },
  {
    id: "2",
    number: 10,
    imageSrc: "https://via.placeholder.com/300",
    name: "Refrigerante",
    description: "Refrigerante de cola gelado",
    price: "1,99",
  },
  {
    id: "3",
    number: 70,
    imageSrc: "https://via.placeholder.com/300",
    name: "Batata Frita",
    description: "Batata frita crocante",
    price: "4,99",
  },
];

export default function FoodDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const item = cards.find((card) => card.id === id);

  const [quantity, setQuantity] = useState(1);

  if (!item) {
    return (
      <View style={styles.container}>
        <Text>Item não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={24} color="#000" />
      </TouchableOpacity>

      <Image source={{ uri: item.imageSrc }} style={styles.image} />

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>
          <Text style={styles.id}>{item.number} - </Text>
          {item.name}
        </Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>

      <View style={{ padding: 15, borderTopWidth: 1, borderTopColor: "#ddd" }}>
        <View style={styles.footerContainer}>
          <View>
            
            <Text style={styles.label}>Valor:</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Text style={styles.quantityText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Text style={styles.quantityText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={styles.label}>Valor:</Text>
            <Text style={styles.price}>R${item.price}</Text>
          </View>
        </View>
        <View>
          <Button title="Adicionar ao carrinho" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  backButton: {
    position: "absolute",
    top: 40,
    zIndex: 10,
    padding: 10,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  id: {
    color: "red",
  },
  description: {
    fontSize: 18,
    color: "#888",
    marginBottom: 20,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  quantityButton: {
    padding: 10,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityValue: {
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#000",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
