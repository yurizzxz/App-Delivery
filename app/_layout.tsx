import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";


export default function RootLayout() {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />

        <Stack.Screen name="cadastro" />
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="_sitemap" />
        <Stack.Screen name="+not-found" />

        <Stack.Screen name="_components/Button/index" />
        <Stack.Screen name="_components/Card/index" />
        <Stack.Screen name="_components/Greeting/index" />
        <Stack.Screen name="_components/Header/index" />
        <Stack.Screen name="_components/Search/index" />

        <Stack.Screen name="foods/[id]" />
        <Stack.Screen name="foods/bebidas" />
        <Stack.Screen name="foods/cardapio" />
        <Stack.Screen name="foods/lanches" />
        <Stack.Screen name="foods/pizzas" />

        <Stack.Screen name="profile/[id]" />
        <Stack.Screen name="profile/lanchesfav" />
        <Stack.Screen name="profile/pedidos" />
        <Stack.Screen name="profile/pizzasfav" />
      </Stack>
    </>
  );
}
