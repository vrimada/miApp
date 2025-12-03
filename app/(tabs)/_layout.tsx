import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#232323',
        headerShown: true,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Inicio",
          title: 'Inicio',
          headerTintColor: '#455454',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={'#232323'} />,
        }}
      />
      <Tabs.Screen
        name="new"
        options={{
          title: 'Nuevo',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus" color={'#232323'} />,
        }}
      />
      <Tabs.Screen
      
        name="lista"
        options={{
          title: 'Gastos',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="list.bullet" color={'#232323'} />,
          headerTitle: "Gastos del mes",
        }}
        
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Historial',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="list.bullet" color={'#232323'} />,
         
        }}
      />
    </Tabs>
  );
}
