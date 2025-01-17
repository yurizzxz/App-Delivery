import {
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import Constants from "expo-constants";
import Greeting from "../_components/Greeting";
import Card from "../_components/Card";
import SearchInput from "../_components/Search";
import { useRouter } from "expo-router";

const statusBarHeight: number = Constants.statusBarHeight;

type Category = {
  name: string;
  imageSrc: string;
  route: string;
};

const categories: Category[] = [
  {
    name: "Lanches",
    imageSrc: "https://via.placeholder.com/100x100",
    route: "../lanches",
  },
  {
    name: "Pizzas",
    imageSrc: "https://via.placeholder.com/100x100",
    route: "../pizzas",
  },
  {
    name: "Bebidas",
    imageSrc: "https://via.placeholder.com/100x100",
    route: "../bebidas",
  },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { marginTop: statusBarHeight, paddingTop: 20, paddingBottom: 40 },
      ]}
    >
      <Greeting
        greeting="Bem vindo,"
        title="usuário"
        onProfilePress={() => {}}
        profileImageUri={null}
      />

      {/* Search */}
      <SearchInput placeholder="O que você procura?" onChangeText={() => {}} />

      <View style={styles.categoryContainer}>
        <View style={styles.categoryItems}>
          {categories.map((category, index) => (
            <Pressable
              key={index}
              style={styles.categoryItem}
              onPress={() => router.push(category.route)}
            >
              <Image
                source={{ uri: category.imageSrc }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryText}>{category.name}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Cards */}
      <View style={styles.cards}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Mais Vendidos
          </Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.cardContainer}>
            <Card
              imageSrc="https://via.placeholder.com/300"
              name="Sanduíche de Frango"
              description="Delicioso sanduíche de frango com queijo"
              price="$9,99"
            />
            <Card
              imageSrc="https://via.placeholder.com/300"
              name="Refrigerante"
              description="Refrigerante de cola gelado"
              price="$1,99"
            />
            <Card
              imageSrc="https://via.placeholder.com/300"
              name="Batata Frita"
              description="Batata frita crocante"
              price="$4,99"
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.cards}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Mais Vendidos
          </Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.cardContainer}>
            <Card
              imageSrc="https://via.placeholder.com/300"
              name="Sanduíche de Frango"
              description="Delicioso sanduíche de frango com queijo"
              price="$9,99"
            />
            <Card
              imageSrc="https://via.placeholder.com/300"
              name="Refrigerante"
              description="Refrigerante de cola gelado"
              price="$1,99"
            />
            <Card
              imageSrc="https://via.placeholder.com/300"
              name="Batata Frita"
              description="Batata frita crocante"
              price="$4,99"
            />
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    padding: 5,
  },

  // cat

  categoryContainer: {
    padding: 10,
  },

  categoryImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginBottom: 5,
    borderRadius: 50,
  },

  categoryItems: {
    flexDirection: "row",
    gap: 10,
  },

  categoryItem: {
    borderRadius: 10,
    marginBottom: 10,
  },

  categoryText: {
    fontSize: 14,
    fontWeight: "bold",
  },

  //cards

  cards: {
    gap: 10,
    padding: 10,
  },
  cardContainer: {
    flexDirection: "row",
    gap: 10,
  },
});
