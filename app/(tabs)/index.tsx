import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

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

type Servicio = {
    id: string;
    nombre: string;
    fechaISO: string;
    fechaDisplay: string;
  };

export default function Index() {
  const [servicios, setServicios] = useState<Servicio[]>([]);

   const cargarServicios = async () => {
    try {
      //Lee el almacenamiento
      const data = await AsyncStorage.getItem("servicios");
      //Lo convierte en un array
       const lista: Servicio[] = data ? JSON.parse(data) : [];


      // Ordena por fecha ISO (YYYY-MM-DD)
      lista.sort((a: any, b: any) =>
        a.fechaISO.localeCompare(b.fechaISO)
      );

      setServicios(lista);
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
      cargarServicios();
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
     
    </View>

     {servicios.length === 0 ? (
        <Text style={{ fontSize: 16 , color: '#fff' }}>No hay vencimientos cargados.</Text>
      ) : (
        <FlatList
          data={servicios}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 12,
                borderWidth: 1,
                borderRadius: 8,
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "600" }}>
                {item.nombre}
              </Text>
              <Text style={{ fontSize: 16 }}>
                Vence: {item.fechaDisplay}
              </Text>
            </View>
          )}
        />
      )}
      
      {/* <Button title="Enviar notificación" onPress={enviarNotificacion} />
      <Link href="/(tabs)/profile" style={{color: '#fff'}}> Ir a Gastos</Link> */}
    </View>
  );
}
