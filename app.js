import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import * as Notifications from 'expo-notifications';

// Configuración para que las notificaciones se muestren en iOS
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {

  // Pedir permisos al abrir la app
  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      console.log("Permiso:", status);
    })();
  }, []);

  // Función para programar una notificación dentro de 1 minuto
  const probarNotificacion = async () => {
    const ahora = new Date();
    const unMinutoDespues = new Date(ahora.getTime() + 1 * 60 * 1000);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🔔 ¡Notificación de prueba!",
        body: "Si ves esto, funciona incluso con la app cerrada.",
      },
      trigger: unMinutoDespues,
    });

    alert("Notificación programada para dentro de 1 minuto. Cerrá la app Expo Go.");
  };

  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
      <Text style={{ fontSize:20, marginBottom:20 }}>
        Probador de Notificaciones
      </Text>

      <Button title="Probar notificación" onPress={probarNotificacion} />
    </View>
  );
}
