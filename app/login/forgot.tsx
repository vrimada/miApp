import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { supabase } from "../supabase/client";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");

  const onReset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://TU-PAGINA-O-RUTA/cambiar-password",
    });

    if (error) return Alert.alert("Error", error.message);

    Alert.alert(
      "Email enviado",
      "Revisá tu correo para recuperar la contraseña."
    );
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Recuperar contraseña</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Button title="Enviar email" onPress={onReset} />
    </View>
  );
}
