import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: {
          height: 60,
          paddingTop: 10,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: 'center' }}>
              <IconSymbol size={28} name="house.fill" color={color} />
              <Text style={{ color, fontSize: 12 }}>Home</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: 'center' }}>
              <IconSymbol size={28} name="paperplane.fill" color={color} />
              <Text style={{ color, fontSize: 12 }}>Explore</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
