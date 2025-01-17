import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Card from "@/app/_components/Card";
import Header from "@/app/_components/Header";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const statusBarHeight: number = Constants.statusBarHeight;

export default function PizzasScreen() {
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { marginTop: statusBarHeight}]}>
      <View style={styles.header}>
        <AntDesign
          name="arrowleft"
          onPress={() => router.back()} 
          size={24}
          color="#000"
          style={styles.arrowIcon}
        />
        <Header title="Pizzas" />
      </View>

      <View style={styles.cardContainer}>
        <Card
          imageSrc="https://via.placeholder.com/300"
          name="Sanduíche de Frango"
          description="Delicioso sanduíche de frango com queijo"
          price="$9,99"
        />
        <Card
          imageSrc="https://via.placeholder.com/300"
          name="Hamburguer"
          description="Hamburguer com queijo e bacon"
          price="$8,99"
        />
        <Card
          imageSrc="https://via.placeholder.com/300"
          name="Croissant de Carne"
          description="Croissant recheado de carne"
          price="$6,49"
        />
      </View>
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
    marginBottom: 10,
  },

  arrowIcon: {
    marginRight: 20, 
    marginTop: 5
  },


  cardContainer: {
    gap: 15,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
