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
        <View style={styles.priceContainer}>
          <Text style={styles.price}>R${price}</Text>
        </View>
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
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    width: 170,
    height: 230,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  content: {
    padding: 13,
    alignItems: 'stretch',
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: 'gray',
    marginTop: -10,
    paddingRight: 20
  },
  priceContainer: {
    alignItems: 'flex-start',
  },
  price: {
    fontSize: 22,
    color: '#000',
    fontWeight: 'bold',
  },
  icon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#ff0000',
    padding: 10,
  },
});
