import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../../styles.js";
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
    <View style={styles.container}>
      <View style={styles.card} >
        <Text style={styles.title}>Crear cuenta</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} style={styles.icon} />

          <TextInput
            placeholder="Email"
            placeholderTextColor={'#888888'}
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} style={styles.icon} />

          <TextInput
            placeholder="Contraseña"
            placeholderTextColor={'#888888'}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}

          />
        </View>
        <TouchableOpacity style={styles.OkButton} onPress={onRegister}>
          <Text style={styles.text}>Crear</Text>
        </TouchableOpacity>

        <View style={styles.row} >
          <TouchableOpacity onPress={() => router.replace("/login")}>
            <Text style={styles.register}>Volver</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}


