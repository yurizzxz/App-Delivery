import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar backgroundColor="transparent" translucent />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="not-found" title="Oops! pagina nao encontrada" />
        <Stack.Screen name="bebidas" options={{ headerShown: false }} />
        <Stack.Screen name="lanches" options={{ headerShown: false }} />
        <Stack.Screen name="pizzas" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
