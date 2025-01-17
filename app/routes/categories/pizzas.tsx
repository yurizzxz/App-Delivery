import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Card from "@/app/_components/Card";

export default function PizzasScreen() {
  return (
    <ScrollView style={styles.container}>
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
    paddingTop: 40,
  },

  cardContainer: {
    gap: 15,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
