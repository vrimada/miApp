import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { getColorForDate, Meses, Servicio } from '../servicio';

export default function ProfileScreen() {
  const mesActual = new Date().getMonth() + 1; // Enero es 0
  const MesEnLetras = Meses[mesActual];
  const [servicios, setServicios] = useState<Servicio[]>([]);
  useFocusEffect(
    useCallback(() => {
      cargarServicios();
    }, []));

  async function cargarServicios() {

    //Lee el almacenamiento
    const data = await AsyncStorage.getItem("servicios");
    //Lo convierte en un array
    const lista: Servicio[] = data ? JSON.parse(data) : [];
    // Ordena por fecha ISO (YYYY-MM-DD)
    const anioActual = new Date().getFullYear();


    // Filtrar por año y mes actual
    const filtrados = lista.filter((s) => {
      const [anio, mes] = s.fechaISO.split("-"); // fechaISO: "YYYY-MM-DD"
      return Number(anio) === anioActual && Number(mes) === mesActual
    });
    // Ordena por fecha ISO (YYYY-MM-DD)
    filtrados.sort((a: any, b: any) =>
      a.fechaISO.localeCompare(b.fechaISO)
    );
    setServicios(filtrados);
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

        <Text style={{ fontSize: 22, color: '#232323', alignItems: "center", justifyContent: "center" }}>Gastos de {MesEnLetras}</Text>
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
                <Text style={{ fontSize: 16, color: getColorForDate(item.fechaISO), fontWeight: "600", }}>
                  Vence: {item.fechaDisplay}  {" "}
                </Text>
                Pagado:{item.pagado === true ? ' Sí' : ' No'}
              </Text>


            </View>
          )}
        />
      )}
    </View>
  );
}

