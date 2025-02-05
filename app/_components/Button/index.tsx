import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
}

export default function Button({ onPress, title, disabled = false }: ButtonProps) {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={disabled} 
      className={`px-5 py-5 rounded-lg ${disabled ? 'bg-gray-500' : 'bg-[#ff0000]'} items-center justify-center`}
    >
      <Text className="text-white text-lg font-bold">{title}</Text>
    </TouchableOpacity>
  );
}


