import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface HeaderProps {
  title: string;
  profileImageUri?: string;
  greeting?: string;
}

export default function Greeting({ title, profileImageUri, greeting }: HeaderProps) {
  const defaultProfileImageUri = "https://www.w3schools.com/w3images/avatar2.png";
  
  const router = useRouter();
  
  const handleProfilePress = () => {
    router.push("/profile");
  };

  return (
    <View className="flex-row justify-between items-center pt-4">
      <View className="flex-col justify-center">
        <Text className="text-2xl text-black font-bold">{greeting}</Text>
        <Text className="text-4xl font-bold text-red-600 leading-9">{title}</Text>
      </View>
      <TouchableOpacity className="flex-row items-center" onPress={handleProfilePress}>
        <Image
          source={{ uri: defaultProfileImageUri }}
          className="w-9 h-9 rounded-full"
        />
      </TouchableOpacity>
    </View>
  );
}
