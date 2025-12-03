import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Text, View } from "react-native";



type Servicio = {
    id: string;
    nombre: string;
    fechaISO: string;
    fechaDisplay: string;
    monto: string;
  };

 
export default function Index() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const getColorForDate = (fechaISO: string) => {
    const hoy = new Date().toISOString().split("T")[0];

    if (fechaISO < hoy) return "red";       // Vencido
    if (fechaISO === hoy) return "orange";  // Hoy
    return "green";                          // Futuro
  };
   const cargarServicios = async () => {
    try {
      //Lee el almacenamiento
      const data = await AsyncStorage.getItem("servicios");
      //Lo convierte en un array
       const lista: Servicio[] = data ? JSON.parse(data) : [];


      //año actual
      const anioActual = new Date().getFullYear();
      //mes actual
       const mesActual = new Date().getMonth() + 1; // Enero es 0
      //dia actual
      const diaActual = new Date().getDate();
      
 // Filtrar por año , mes y dia actual
    const filtrados = lista.filter((s) => {
      const [anio, mes, dia] = s.fechaISO.split("-"); // fechaISO: "YYYY-MM-DD"
      return Number(anio) === anioActual && Number(mes) === mesActual && Number(dia) >= diaActual;
    });

    setServicios(filtrados);
    } catch (err) {
      console.error(err);
    }
  };
  /* async function guardarToken(token: string) {
    try {
      await AsyncStorage.setItem("pushToken", token);
      console.log("Token guardado");
    } catch (err) {
      console.log("Error al guardar token:", err);
    }
  }
  //corre una sola vez al montar
 useEffect(() => {
    registerForPushNotificationsAsync().then((token: unknown) => {
      if (typeof token === 'string' && token) {
        console.log("TOKEN:", token);
        guardarToken(token);
      }
    });
  }, []); */
  //corre cada vez que volvés al tab
  useFocusEffect(
    useCallback(() => {
      cargarServicios();
  }, []));

  
/*   const enviarNotificacion = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "¡Hola Vane! 🔔",
        body: "Esta es una notificación de prueba.",
      },
      trigger: null, // null = se muestra inmediatamente
    });
  }; */



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
              <Text style={{ fontSize: 18, fontWeight: "600", color: '#fff' }}>
                {item.nombre} ${item.monto} - {" "}
                  <Text style={{ fontSize: 16 ,  color: getColorForDate(item.fechaISO),    fontWeight: "600",}}>
                  Vence: {item.fechaDisplay}
              </Text>
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

