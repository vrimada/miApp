import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, Switch, Text, TextInput, View } from "react-native";
import { Servicio } from "./servicio";



export default function EditarServicio() {
  const { id } = useLocalSearchParams(); // toma ?id=...
  const [servicio, setServicio] = useState<Servicio | null>(null);

  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [monto, setMonto] = useState("");
  const [pagado, setPagado] = useState(false);

  // Cargar servicio específico
  useEffect(() => {
    const cargar = async () => {
      const data = await AsyncStorage.getItem("servicios");
      const lista: Servicio[] = data ? JSON.parse(data) : [];

      const encontrado = lista.find((s) => s.id === id);

      if (!encontrado) {
        Alert.alert("Error", "No se encontró el servicio.");
        router.back();
        return;
      }

      setServicio(encontrado);
      setNombre(encontrado.nombre);
      setFecha(encontrado.fechaISO);
      setMonto(encontrado.monto);
      setPagado(encontrado.pagado ?? false);
    };

    cargar();
  }, []);

  const guardarCambios = async () => {
    const data = await AsyncStorage.getItem("servicios");
    let lista: Servicio[] = data ? JSON.parse(data) : [];

    lista = lista.map((s) =>
      s.id === id
        ? {
            ...s,
            nombre,
            fechaISO: fecha,
            fechaDisplay: new Date(fecha).toLocaleDateString("es-AR"),
            monto,
            pagado,
          }
        : s
    );

    await AsyncStorage.setItem("servicios", JSON.stringify(lista));

    Alert.alert("Actualizado", "Los cambios se guardaron correctamente", [
      {
        text: "OK",
        onPress: () => router.back(),
      },
    ]);
  };

  if (!servicio) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Cargando servicio...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Editar servicio
      </Text>

      <Text style={{ marginTop: 20 }}>Nombre:</Text>
      <TextInput
        value={nombre}
        onChangeText={setNombre}
        style={{
          borderWidth: 1,
          padding: 8,
          borderRadius: 6,
        }}
      />

      <Text style={{ marginTop: 20 }}>Fecha (YYYY-MM-DD):</Text>
      <TextInput
        value={fecha}
        onChangeText={setFecha}
        style={{
          borderWidth: 1,
          padding: 8,
          borderRadius: 6,
        }}
      />

      <Text style={{ marginTop: 20 }}>Monto:</Text>
      <TextInput
        value={monto}
        onChangeText={setMonto}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          padding: 8,
          borderRadius: 6,
        }}
      />

      <View style={{ flexDirection: "row", marginTop: 20, alignItems: "center" }}>
        <Text style={{ marginRight: 10 }}>Pagado:</Text>
        <Switch value={pagado} onValueChange={setPagado} />
      </View>

      <View style={{ marginTop: 30 }}>
        <Button title="Guardar cambios" onPress={guardarCambios} />
      </View>
    </View>
  );
}
