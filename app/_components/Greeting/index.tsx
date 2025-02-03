import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface HeaderProps {
  title: string;
  onProfilePress: () => void;
  profileImageUri?: string;
  greeting?: string;
}

export default function Greeting({ title, onProfilePress, profileImageUri, greeting }: HeaderProps) {
  return (
    <View className="flex-row justify-between items-center pt-4">
      <View className="flex-col justify-center">
        <Text className="text-2xl text-black font-bold">{greeting}</Text>
        <Text className="text-4xl font-bold text-red-600 leading-9'">{title}</Text>
      </View>
      <TouchableOpacity className="flex-row items-center" onPress={onProfilePress}>
        {profileImageUri ? (
          <Image 
            source={{ uri: profileImageUri }} 
            className="w-9 h-9 rounded-full" 
          />
        ) : (
          <AntDesign name="user" size={24} color="gray" />
        )}
      </TouchableOpacity>
    </View>
  );
}
