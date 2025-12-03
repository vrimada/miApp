import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { filtrarPorMes, getColorForDate, Servicio } from '../servicio';

export default function ProfileScreen() {
    const [servicios, setServicios] = useState<Servicio[]>([]);
    var [enero, setEnero] = useState<Servicio[]>([]);
    var [febrero, setFebrero] = useState<Servicio[]>([]);
    var [marzo, setMarzo] = useState<Servicio[]>([]);
    var [abril, setAbril] = useState<Servicio[]>([]);
    var [mayo, setMayo] = useState<Servicio[]>([]);
    var [junio, setJunio] = useState<Servicio[]>([]);
    var [julio, setJulio] = useState<Servicio[]>([]);
    var [agosto, setAgosto] = useState<Servicio[]>([]);
    var [septiembre, setSeptiembre] = useState<Servicio[]>([]);
    var [octubre, setOctubre] = useState<Servicio[]>([]);
    var [noviembre, setNoviembre] = useState<Servicio[]>([]);
    var [diciembre, setDiciembre] = useState<Servicio[]>([]);

    const setters: Record<number, Dispatch<SetStateAction<Servicio[]>>> = {
        1: setEnero,
        2: setFebrero,
        3: setMarzo,
        4: setAbril,
        5: setMayo,
        6: setJunio,
        7: setJulio,
        8: setAgosto,
        9: setSeptiembre,
        10: setOctubre,
        11: setNoviembre,
        12: setDiciembre,
    };

    function ListaPorMes({
        titulo,
        datos,
    }: {
        titulo: string;
        datos: Servicio[];
    }) {
        return (
            <View style={{ marginBottom: 20 }}>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 22 }}>{titulo}</Text>
                </View>

                {datos.length === 0 ? (
                    <Text style={{ fontSize: 16 }}>No hay vencimientos cargados.</Text>
                ) : (
                    <FlatList
                        data={datos}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false} 
                        renderItem={({ item }) => (
                            <View
                                style={{
                                    padding: 12,
                                    borderWidth: 1,
                                    borderRadius: 8,
                                    marginBottom: 10,
                                }}
                            >
                                <Text style={{ fontSize: 18, fontWeight: "600" }}>
                                    {item.nombre} ${item.monto}{" "}
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            color: getColorForDate(item.fechaISO),
                                            fontWeight: "600",
                                        }}
                                    >
                                        Vence: {item.fechaDisplay}{" "}
                                    </Text>
                                    Pagado: {item.pagado ? "Sí" : "No"}
                                </Text>
                            </View>
                        )}
                    />
                )}
            </View>
        );
    }


    useFocusEffect(
        useCallback(() => {
            cargarServicios();
        }, []));

    async function cargarServicios() {

        //Lee el almacenamiento
        const data = await AsyncStorage.getItem("servicios");
        //Lo convierte en un array
        const lista: Servicio[] = data ? JSON.parse(data) : [];
        const anioActual = new Date().getFullYear();
        for (let mes = 1; mes <= 12; mes++) {
            const filtrados = filtrarPorMes(lista, mes, anioActual);
            const setter = setters[mes];
            setter(filtrados);
        }
    }

    return (
             <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 10 }}>

            <ListaPorMes titulo="Enero" datos={enero} />
            <ListaPorMes titulo="Febrero" datos={febrero} />
            <ListaPorMes titulo="Marzo" datos={marzo} />
            <ListaPorMes titulo="Abril" datos={abril} />
            <ListaPorMes titulo="Mayo" datos={mayo} />
            <ListaPorMes titulo="Junio" datos={junio} />
            <ListaPorMes titulo="Julio" datos={julio} />
            <ListaPorMes titulo="Agosto" datos={agosto} />
            <ListaPorMes titulo="Septiembre" datos={septiembre} />
            <ListaPorMes titulo="Octubre" datos={octubre} />
            <ListaPorMes titulo="Noviembre" datos={noviembre} />
            <ListaPorMes titulo="Diciembre" datos={diciembre} />
        </ScrollView> 


    );
}
