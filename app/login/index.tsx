import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../../styles.js";
import { supabase } from "../supabase/client";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  /*const [remember, setRemember] = useState(false);*/

  const onLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      router.replace(`/(tabs)`);
    }
  };

  function onRemember() {
    Alert.alert("Recuperar contraseña", "Funcionalidad de recuperación de contraseña no implementada.");
  }
  return (
   

     <View style={styles.container}>
      {/* Fondo (después podés reemplazar por ImageBackground si querés) */}
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        {/* Input Email */}
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} style={styles.icon} />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholderTextColor={'#888888' }
          />
        </View>

        {/* Input password */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} style={styles.icon} />
          <TextInput
            placeholder="Contraseña"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholderTextColor={'#888888' }
          />
        </View>

        {/* Row remember + forgot */}
        <View style={styles.row}>
          {/*<TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setRemember(!remember)}
          >
            <View style={styles.checkbox}>
              {remember && <View style={styles.checkboxTick} />}
            </View>
            <Text style={styles.checkboxText}>Recorda usuario y contraseña</Text>
          </TouchableOpacity>*/}

          <TouchableOpacity onPress={onRemember}>
            <Text style={styles.forgotText}>Me olvide la contraseña</Text>
          </TouchableOpacity>
        </View>

        {/* Botón login */}
        <TouchableOpacity style={styles.OkButton} onPress={onLogin}>
          <Text style={styles.text}>Login</Text>
         
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footerText}>
          No tenes una cuenta? <Text style={styles.register} onPress={() => router.push("/login/register" as any)}>Registrar</Text>
        </Text>
      </View>
    </View>

  );
}


