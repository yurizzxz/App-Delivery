import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, arrayUnion } from 'firebase/firestore';

interface CardProps {
  imageSrc: string;
  name: string;
  description: string;
  price: string;
}

export default function Card({ imageSrc, name, description, price }: CardProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Erro', 'Você precisa estar logado para adicionar ao carrinho.');
      return;
    }

    setIsAdding(true);
    const db = getFirestore();
    const userCartRef = doc(db, 'carts', user.uid);

    try {
      await setDoc(userCartRef, {
        items: arrayUnion({
          name,
          imageSrc,
          price: parseFloat(price),
          description,
          quantity: 1,
        }),
      }, { merge: true });

      Alert.alert('Sucesso', 'Item adicionado ao carrinho!');
    } catch (error) {
      console.error('Erro ao adicionar item ao carrinho: ', error);
      Alert.alert('Erro', 'Não foi possível adicionar o item ao carrinho.');
    } finally {
      setIsAdding(false);
    }
  };

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
      <TouchableOpacity style={styles.icon} onPress={handleAddToCart} disabled={isAdding}>
        <AntDesign name="shoppingcart" size={24} color="white" style={{ right: 1 }} />
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
    height: 245,
  },
  image: {
    width: '100%',
    height: '65%',
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
    marginTop: -5,
    paddingRight: 20,
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
