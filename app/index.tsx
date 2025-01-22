import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Button from "./_components/Button";

export default function BeginScreen() {
  const router = useRouter();

  const handleNavigateToLogin = () => {
    router.push("../login");
  };
  const handleNavigateToRegister = () => {
    router.push("../cadastro");
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../assets/images/andree.png")}
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>Os melhores lanches e pizzas da região!</Text>
      <Button title="Entre Agora" onPress={handleNavigateToLogin} />

      <TouchableOpacity style={{ alignItems: "center", marginTop: 20 }} onPress={handleNavigateToRegister}>
        <Text style={{ fontSize: 20 }}>
          Não possui uma conta?<Text style={{ color: "#ff0000" }}> Crie já</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  logo: {
    width: 320,
    height: 250,
    marginBottom: 40,
    resizeMode: "contain",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
});
