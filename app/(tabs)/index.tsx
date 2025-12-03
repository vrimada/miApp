import AsyncStorage from '@react-native-async-storage/async-storage';

import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Button, FlatList, Text, View } from "react-native";
import { getColorForDate, Servicio } from '../servicio';


export default function Index() {
  const [servicios, setServicios] = useState<Servicio[]>([]);

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

      // Ordena por fecha ISO (YYYY-MM-DD)
      filtrados.sort((a: any, b: any) =>
        a.fechaISO.localeCompare(b.fechaISO)
      );

      setServicios(filtrados);
    } catch (err) {
      console.error(err);
    }
  };

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
        <Text style={{ fontSize: 20, color: '#232323' }}>Vencimientos pendientes</Text>

      </View>

      {servicios.length === 0 ? (
        <Text style={{ fontSize: 16, color: '#232323' }}>No hay vencimientos cargados.</Text>
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
              <Text style={{ fontSize: 18, fontWeight: "600", color: '#232323' }}>
                {item.nombre} ${item.monto} - {" "}
                <Text style={{ fontSize: 16, fontWeight: "600", color: getColorForDate(item.fechaISO), }}>
                  Vence: {item.fechaDisplay} {" "}
                </Text>
                Pagado:{item.pagado === true ? ' Sí' : ' No'}

              </Text>
              <Button
                title="Editar"
                onPress={() => {
                  router.push({
                    pathname: "/editar",
                    params: { id: item.id },
                  });
                }}
               
              />


            </View>
          )}
        />
      )}

      {/* <Button title="Enviar notificación" onPress={enviarNotificacion} />
      <Link href="/(tabs)/profile" style={{color: '#fff'}}> Ir a Gastos</Link> */}
    </View>
  );
}

