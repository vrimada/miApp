import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import styles from "../../styles.js";
import { getColorForDate, Meses, Servicio } from '../servicio';
import { parseMonto, round2 } from '../utils/Help';

export default function ProfileScreen() {
  const mesActual = new Date().getMonth() + 1; // Enero es 0
  const MesEnLetras = Meses[mesActual];
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalPagado, setTotalPagado] = useState<number>(0);
  const [totalPendiente, setTotalPendiente] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      cargarServicios();
    }, []));

  async function cargarServicios() {
   var totalT: number = 0;
   var totalPagadoT : number = 0; 
  
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

    filtrados.forEach(servicios => {
      var montoNum = parseMonto(servicios.monto);
      totalT += montoNum;
      if (servicios.pagado) {
        totalPagadoT += montoNum;
      }
    });
    totalT = round2(totalT);
    totalPagadoT = round2(totalPagadoT);
    setTotal(totalT);
    setTotalPagado(totalPagadoT);
    setTotalPendiente(totalT - totalPagadoT);
  }

  return (
    <View style={styles.container}>
        <View style={styles.card} >
        <Text style={styles.title}>Gastos de {MesEnLetras}</Text>
     
      {servicios.length === 0 ? (
        <Text style={styles.text}>No hay vencimientos cargados.</Text>
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
              <Text style={{ fontSize: 18, fontWeight: "600"}}>
                {item.nombre} ${item.monto} 
              </Text>
              
                <Text style={{ fontSize: 16, color: getColorForDate(item.fechaISO), fontWeight: "600", }}>
                  Vencimiento: {item.fechaDisplay}  {" "} 
                </Text>
               
               <Text>
                  Pagado:{item.pagado === true ? 
                    <Ionicons name="checkmark-circle" size={20} style={styles.icon} />
                    :
                    <Ionicons name="close-circle" size={20} style={styles.icon} />
                        } 
                  </Text>


            </View>
          )}
        />
      )}

      
        <Text style={styles.title}>Resumen</Text>
        <Text style={styles.text}>Total Gastado: ${total}</Text>
        <Text style={styles.text}>Total Pagado: ${totalPagado}</Text>
        <Text style={styles.text}>Total Pendiente: ${totalPendiente} </Text>
      </View>
    </View>
  );
}

