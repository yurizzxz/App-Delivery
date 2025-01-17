import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface HeaderProps {
  title: string;
  onProfilePress: () => void;
  profileImageUri?: string;
}

export default function Header({ title, onProfilePress, profileImageUri }: HeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.leftContent}>
        <Text style={styles.greeting}>Bem-vindo,</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableOpacity style={styles.profileIcon} onPress={onProfilePress}>
        {profileImageUri ? (
          <Image 
            source={{ uri: profileImageUri }} 
            style={styles.profileImage} 
          />
        ) : (
          <AntDesign name="user" size={24} color="gray" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  leftContent: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 24,
    color: '#000',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#d30000'
  },
  profileIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 10,
  },
});
