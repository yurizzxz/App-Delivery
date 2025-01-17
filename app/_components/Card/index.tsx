import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface CardProps {
    imageSrc: string;
    name: string;
    description: string;
    price: string;
  }

export default function Card({ imageSrc, name, description, price }: CardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageSrc }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
      <TouchableOpacity style={styles.icon}>
        <AntDesign name="shoppingcart" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    overflow: 'hidden',
    marginBottom: 20,
    width: 300,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  content: {
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    color: 'green',
    marginTop: 8,
    fontWeight: 'bold',
  },
  icon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#d30000',
    borderRadius: 50,
    padding: 10,
  },
});
