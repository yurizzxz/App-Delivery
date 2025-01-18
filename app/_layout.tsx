import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar backgroundColor="transparent" translucent />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />

        <Stack.Screen name="cadastro" />
        <Stack.Screen name="(tabs)" />

        <Stack.Screen name="foods" />
        <Stack.Screen name="profileOptions" />

        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}
