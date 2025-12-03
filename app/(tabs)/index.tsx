import * as Device from 'expo-device';
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { Text, View } from "react-native";
// Esto hace que las notificaciones se muestren incluso con la app abierta
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function Index() {
  useEffect(() => {
    // Pedir permisos apenas abre la app
     if (Device.isDevice) 
        Notifications.requestPermissionsAsync();
  }, []);

  const enviarNotificacion = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "¡Hola Vane! 🔔",
        body: "Esta es una notificación de prueba.",
      },
      trigger: null, // null = se muestra inmediatamente
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20, color: '#fff' }}>Vencimientos pendientes</Text>
      <Text style={{ marginTop: 10 ,color: '#fff' }}>
        (Acá mostraremos los próximos vencimientos)
      </Text>
    </View>
      {/* <Button title="Enviar notificación" onPress={enviarNotificacion} />
      <Link href="/(tabs)/profile" style={{color: '#fff'}}> Ir a Gastos</Link> */}
    </View>
  );
}
