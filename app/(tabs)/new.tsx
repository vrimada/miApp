import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRef, useState } from "react";
import { Alert, Button, Text, TextInput, View } from 'react-native';


export default function NewScreen() {
    const [nombre, setNombre] = useState("");
    const [fecha, setFecha] = useState("");
    const [monto, setMonto] = useState("");
    const montoRef = useRef<TextInput>(null);

    const formatearFecha = (text: string) => {
    let cleaned = text.replace(/\D/g, "");
    cleaned = cleaned.slice(0, 8);
    // aplicar formato DD/MM/YYYY
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = cleaned.slice(0, 2) + "/" + cleaned.slice(2);
    }
    if (cleaned.length > 4) {
      formatted = formatted.slice(0, 5) + "/" + cleaned.slice(4);
    }
    setFecha(formatted);
  };

  async function guardarServicioEnStorage() {

  // Convertir fecha DD/MM/AAAA a YYYY-MM-DD (útil para ordenar)
    const [dia, mes, año] = fecha.split("/");
    const fechaISO = `${año}-${mes}-${dia}`;

    const nuevo = {
      id: Date.now().toString(),
      nombre,
      monto,
      fechaISO,
      fechaDisplay: fecha
    };
       // Leer lista existente
      const data = await AsyncStorage.getItem("servicios");
      const lista = data ? JSON.parse(data) : [];

      // Agregar el nuevo servicio
      lista.push(nuevo);

      // Guardar
      await AsyncStorage.setItem("servicios", JSON.stringify(lista));
       
}
  const guardarServicio = async () => {
    if (!nombre || fecha.length !== 10 || monto.length === 0) {
      Alert.alert("Error", "Completá nombre, monto y fecha (DD/MM/AAAA)");
      return;
    }

      // 1) Quitar el focus ANTES de limpiar
    montoRef.current?.blur();
     // 1) guardar en storage
    await guardarServicioEnStorage();
    

    try {
       // 2) programar notificación
       /*  const target = new Date(fecha);
        await programarNotificacion(
            "Vencimiento hoy",
            `${nombre} vence hoy`,
            target
        ); */
      

       // 3) limpiar campos del form
      setNombre("");
      setFecha("");
      setMonto("");

      Alert.alert("Guardado", "Servicio agregado correctamente");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "No se pudo guardar");
    }
  };
return(
    <View style={{
        flex: 1,
        justifyContent: "center",
       
        padding: 20,
      }}>
      <Text style={{ fontSize: 22, marginBottom: 20 , color: '#fff' }}>
        Alta de nuevo servicio
      </Text>

       

      <Text style={{color: '#fff' }}>Nombre del servicio:</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 8, marginBottom: 10, color: '#fff' , 
            borderColor: '#fff' , 
        }}
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={{color: '#fff' }}>Fecha de vencimiento:</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 8, marginBottom: 10,   borderColor: '#fff' , color: '#fff' }}
        value={fecha}
        keyboardType="numeric"
        onChangeText={formatearFecha}
        maxLength={10} // DD/MM/AAAA
      />

     <Text style={{color: '#fff' }}>Monto:</Text>
     <TextInput
        ref={montoRef}
        style={{ borderWidth: 1, padding: 8, marginBottom: 20,   borderColor: '#fff' , color: '#fff' }}
        keyboardType="numeric"
        value={monto}
        onChangeText={setMonto}
      />
      <Button title="Guardar" onPress={guardarServicio} />
    </View>

);
}
