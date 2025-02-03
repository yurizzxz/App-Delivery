import React from 'react';
import { View, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface SearchInputProps {
  placeholder?: string;
  onChangeText: (text: string) => void;
}

export default function SearchInput({ placeholder, onChangeText }: SearchInputProps) {
  return (
    <View className="flex-row items-center bg-[#f5f5f5] rounded-lg py-2 my-2">
      <AntDesign name="search1" size={20} color="#999" className="absolute left-4 z-10" />
      <TextInput
        className="flex-1 h-12 rounded-lg pl-12 bg-[#ECECEC]"
        placeholder={placeholder || 'Pesquisar...'}
        onChangeText={onChangeText}
      />
    </View>
  );
}
