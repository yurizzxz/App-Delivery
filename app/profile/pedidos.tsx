import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Header from "@/app/_components/Header";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import Button from "../_components/Button";

const statusBarHeight: number = Constants.statusBarHeight;

type Item = {
  id: string;
  description: string;
  imageSrc: string;
  name: string;
  price: string;
  quantity: number;
};

type Pedido = {
  id: string;
  items: Item[];
  totalAmount: string;
  orderDate: string;
  status: boolean;
};

export default function PedidosScreen() {
  const router = useRouter();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPedidos = () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.error("Usuário não autenticado.");
        return;
      }

      const db = getFirestore();
      const pedidosRef = collection(db, "pedidos");

      const pedidosQuery = query(
        pedidosRef,
        where("userId", "==", user.uid),
        where("status", "==", true)
      );

      const unsubscribe = onSnapshot(pedidosQuery, (querySnapshot) => {
        const pedidosData: Pedido[] = [];
        querySnapshot.forEach((doc) => {
          pedidosData.push({ id: doc.id, ...doc.data() } as Pedido);
        });
        setPedidos(pedidosData);
      });

      return unsubscribe;
    };

    const unsubscribe = fetchPedidos();
    return () => unsubscribe();
  }, []);

  const handleOpenModal = (pedido: Pedido) => {
    setSelectedPedido(pedido);
    setModalVisible(true);

    pedido.items.forEach((item) => {
      console.log(`Item ID ao abrir o modal: ${item.id}`);
    });
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedPedido(null);
  };

  const handleItemPress = (itemId: string) => {
    if (itemId) {
      setLoading(true);
      console.log(`Produto selecionado ID: ${itemId}`);
      router.push(`./foods/${itemId}`);
      handleCloseModal();
    } else {
      console.error("Item ID não encontrado");
    }
  };

  const handleNavigateToCardapio = () => {
    router.push("../foods/cardapio");
  };

  return (
    <ScrollView style={[styles.container, { marginTop: statusBarHeight }]}>
      <View style={styles.header}>
        <AntDesign
          name="arrowleft"
          onPress={() => router.back()}
          size={24}
          color="#000"
          style={styles.arrowIcon}
        />
        <Header title="Histórico de Pedidos" />
      </View>

      {pedidos.length === 0 ? (
        <View style={styles.noPedidosContainer}>
          <Text style={styles.noPedidosText}>
            Você ainda não tem pedidos realizados.
          </Text>
          <Button title="Ir para Cardápio" onPress={handleNavigateToCardapio} />
        </View>
      ) : (
        <View style={styles.cardContainer}>
          {pedidos.map((pedido) => (
            <TouchableOpacity
              key={pedido.id}
              onPress={() => handleOpenModal(pedido)}
            >
              <View style={styles.card}>
                <Image
                  source={{ uri: pedido.items[0].imageSrc }}
                  style={styles.cardImage}
                />
                <View style={styles.cardContent}>
                  <Text style={styles.title}>Pedido #{pedido.id}</Text>
                  <Text style={styles.description}>
                    Itens: {pedido.items.length} - Total: {pedido.totalAmount}
                  </Text>
                  <Text style={styles.date}>
                    Data: {new Date(pedido.orderDate).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {selectedPedido && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={handleCloseModal}
        >
          <TouchableWithoutFeedback onPress={handleCloseModal}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>
                  Itens do Pedido #{selectedPedido.id}
                </Text>
                <ScrollView style={styles.itemsContainer}>
                  {selectedPedido.items.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleItemPress(item.id)}
                    >
                      <View style={styles.itemCard}>
                        <Image
                          source={{ uri: item.imageSrc }}
                          style={styles.itemImage}
                        />
                        <View style={styles.itemDetails}>
                          <Text style={styles.itemName}>{item.name}</Text>
                          <Text style={styles.itemDescription}>
                            {item.description}
                          </Text>
                          <Text style={styles.itemPrice}>
                            Preço: {item.price}
                          </Text>
                          <Text style={styles.itemQuantity}>
                            Quantidade: {item.quantity}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <Button title="Fechar" onPress={handleCloseModal} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },

  arrowIcon: {
    marginRight: 20,
    marginTop: 5,
  },

  cardContainer: {
    gap: 15,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    flexDirection: "row",
    padding: 10,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },

  cardContent: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },

  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },

  date: {
    fontSize: 12,
    color: "#888",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "95%",
    maxHeight: "100%",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },

  itemsContainer: {
    maxHeight: 300,
  },

  itemCard: {
    flexDirection: "row",
    marginBottom: 15,
  },

  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },

  itemDetails: {
    flex: 1,
    justifyContent: "center",
  },

  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },

  itemDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },

  itemPrice: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },

  itemQuantity: {
    fontSize: 14,
    color: "#555",
  },

  noPedidosContainer: {
    justifyContent: "flex-start",
  },

  noPedidosText: {
    marginBottom: 20,
  },
});
