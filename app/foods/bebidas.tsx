import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Card from "@/app/_components/Card";
import Header from "@/app/_components/Header";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const statusBarHeight: number = Constants.statusBarHeight;

const router = useRouter();

export default function BebidasScreen() {
  return (
    <ScrollView style={[styles.container, { marginTop: statusBarHeight, paddingTop: 20 }]}>
      <View style={styles.header}>
        <Header title="Lanches" />
        <AntDesign name="arrowright" onclick={() => router.back()} size={24} color="#000" style={styles.arrowIcon} />
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
    paddingTop: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 15,
  },

  arrowIcon: {
    marginLeft: 10,
  },

  cardContainer: {
    gap: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
  },
});
