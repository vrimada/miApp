import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function NewScreen() {
    const [nombre, setNombre] = useState("");
    const [fecha, setFecha] = useState("");
    const [monto, setMonto] = useState("");
    
    const guardar = () => {
    alert(`Guardado: ${nombre} vence el ${fecha}`);
    };

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
        style={{ borderWidth: 1, padding: 8, marginBottom: 20,   borderColor: '#fff' , color: '#fff' }}
        keyboardType="numeric"
        value={monto}
        onChangeText={setMonto}
      />
      <Button title="Guardar" onPress={guardar} />
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