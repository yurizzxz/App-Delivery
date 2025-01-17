import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface SearchInputProps {
  placeholder?: string;
  onChangeText: (text: string) => void;
}

export default function SearchInput({ placeholder, onChangeText }: SearchInputProps) {
  return (
    <View style={styles.container}>
      <AntDesign name="search1" size={20} color="#999" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder || 'Pesquisar...'}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 50,
    backgroundColor: '#ECECEC',
  },
  icon: {
    position: 'absolute',
    left: 25,
    zIndex: 1,
  },
});
