import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { supabase } from "../supabase/client";

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onRegister = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) return Alert.alert("Error", error.message);

    Alert.alert(
      "Cuenta creada",
      "Revisa tu correo para confirmar la cuenta."
    );
    router.replace("/(tabs)/lista");
  };

  return (
    <View style={{ padding: 20,flex: 1, }}>
      <Text>Crear nueva cuenta</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor={'#888888' }
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <TextInput
        placeholder="Contraseña"
        placeholderTextColor={'#888888' }
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <View style={[styles.buttonContainer, { backgroundColor: '#fff'} ]} >
      <Button title="Registrarme" onPress={onRegister} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 5,
    borderColor:' #25292e',
    borderBottomColor: '#232323',
    // width: '100%',
    // height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
})