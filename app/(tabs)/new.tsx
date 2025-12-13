import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRef, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from "../../styles.js";
import { programarNotificacionSeguro } from "../utils/Notificacion";


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
         const target = new Date(fecha);
           programarNotificacionSeguro(
            "Vencimiento hoy!",
            `${nombre} vence hoy por un monto de $${monto}`,
            target
          );
        // await programarNotificacion(
        //     "Vencimiento hoy",v
        //     `${nombre} vence hoy`,
        //     target
        // ); 
      

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
  <View style={styles.container} >


    <View style={styles.card}>
      <Text style={styles.title}>
        Alta de nuevo servicio
      </Text>
      <Text style={styles.text}>Nombre del servicio:</Text>
      
      <View style={styles.inputContainer} >
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
        />
      </View>

      <Text style={styles.text}>Fecha de vencimiento:</Text>
      <View style={styles.inputContainer} >
        <TextInput
          style={styles.input}
          value={fecha}
          keyboardType="numeric"
          onChangeText={formatearFecha}
          maxLength={10} // DD/MM/AAAA
        />
       </View>

     <Text style={styles.text}>Monto:</Text>

     <View style={styles.inputContainer} >
     <TextInput
        ref={montoRef}
        style={styles.input}
        keyboardType="numeric"
        value={monto}
        onChangeText={setMonto}
      />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={guardarServicio}>
        <Text style={styles.text}>Guardar</Text>
      </TouchableOpacity>
    </View>
  </View>
);
}
