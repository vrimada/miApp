import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
    /**
 * Rojo → vencido
 * Naranja → vence hoy
 * Verde → futuro
 */

  const getColorForDate = (fechaISO: string) => {
  const hoy = new Date().toISOString().split("T")[0];

  if (fechaISO < hoy) return "red";       // Vencido
  if (fechaISO === hoy) return "orange";  // Hoy
  return "green";                          // Futuro
};
type Servicio = {
    id: string;
    nombre: string;
    fechaISO: string;
    fechaDisplay: string;
    monto: string;
  };

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
      //mes actual
       const mesActual = new Date().getMonth() + 1; // Enero es 0
     
      
 // Filtrar por año y mes actual
    const filtrados = lista.filter((s) => {
      const [anio, mes, dia] = s.fechaISO.split("-"); // fechaISO: "YYYY-MM-DD"
      return Number(anio) === anioActual && Number(mes) === mesActual 
    });

      setServicios(filtrados);
  }

return(
    <View  
    style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}>
     <Text style={{ fontSize: 22 , color:'#fff'}}>Gastos del mes</Text>
     
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',   
    },
    text: {     color: '#fff',}});    