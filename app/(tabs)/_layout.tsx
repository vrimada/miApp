import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import * as Notifications from "expo-notifications";
import { Tabs } from "expo-router"; // Import Tabs from expo-router
import React, { useEffect } from 'react';
// handler global
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function TabLayout() {
  

  useEffect(() => {
    (async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        await Notifications.requestPermissionsAsync();
      }
    })();
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFFFFF',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
        backgroundColor: '#232323',   // ← cambiá este color
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Inicio",
          title: 'Inicio',
          headerTintColor: '#FFFFFF',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={'#FFFFFF'} />,
        }}
      />
      <Tabs.Screen
        name="new"
        options={{
          title: 'Nuevo',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus" color={'#FFFFFF'} />,
        }}
      />
      <Tabs.Screen
      
        name="lista"
        options={{
          title: 'Gastos',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="list.bullet" color={'#FFFFFF'} />,
          headerTitle: "Gastos del mes",
        }}
        
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Historial',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="list.bullet" color={'#FFFFFF'} />,
         
        }}
        
      />
    </Tabs>
  ); 
}
