import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface HeaderProps {
  title: string;
}

export default function Header({
  title,
}: HeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
  },
});
