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
      lista.sort((a: any, b: any) =>
        a.fechaISO.localeCompare(b.fechaISO)
      );
      setServicios(lista);
  }

return(
    <View  
    style={{
       flex: 1,
         
        alignItems: "center",
        padding: 20,
      }}>
              <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

     <Text style={{ fontSize: 22 }}>Historial de Gastos</Text>
     </View>
      {servicios.length === 0 ? (
              <Text style={{ fontSize: 16  }}>No hay vencimientos cargados.</Text>
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