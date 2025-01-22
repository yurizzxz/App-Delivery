import {
  View,
  Text,
  StyleSheet,
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
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { fetchCards } from "../services/firebaseConfig";
import Button from "../_components/Button";

// Definição dos tipos
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

  // Função para adicionar ao carrinho
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
      // Verificar se já existe um carrinho para o usuário
      const userDoc = await getDoc(userCartRef);
      if (userDoc.exists()) {
        // Atualizar o carrinho existente com os novos itens
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
        // Criar um novo carrinho e adicionar o item
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

  // Função para adicionar aos favoritos
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

      setIsFavorite(!isFavorite);

      Alert.alert("Sucesso", "Lanche adicionado aos favoritos.");
    } catch (error) {
      console.error("Erro ao adicionar aos favoritos:", error);
      Alert.alert("Erro", "Não foi possível adicionar aos favoritos.");
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

  if (!item) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000"></ActivityIndicator>
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
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <TouchableOpacity onPress={handleFavorite}>
            <AntDesign
              name={isFavorite ? "heart" : "hearto"}
              size={24}
              color={isFavorite ? "#ff0000" : "#000"}
            />
          </TouchableOpacity>
        </View>
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
          <Button title="Adicionar ao carrinho" onPress={handleAddToCart} />
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
    height: 340,
    resizeMode: "cover",
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
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
    paddingBottom: 20,
    paddingTop: 5,
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
