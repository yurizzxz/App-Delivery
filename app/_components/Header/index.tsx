import React from "react";
import { View, Text } from "react-native";

interface HeaderProps {
  title: string;
}

export default function Header({
  title,
}: HeaderProps) {
  return (
    <View className="flex-row justify-between items-center py-4">
      <Text className="text-4xl font-bold text-black">{title}</Text>
    </View>
  );
}
