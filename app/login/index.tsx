import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { supabase } from "../supabase/client";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    <View style={{ padding: 20,flex: 1, }}>
      <Text>Iniciar sesión</Text>

      <TextInput
      placeholderTextColor={

        '#888888' }
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8, color: '#232323' }}
      />

      <TextInput
        placeholderTextColor={'#888888' }
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 , color: '#232323' , }}
      />



   <View style={[ styles.button, { backgroundColor: '#fff', borderRadius: 5 , marginBottom: 10 , marginTop:150 }]}>
            <Button title="Ingresar" onPress={onLogin} />
      </View>

      <View style={[ styles.button,, { backgroundColor: '#fff' ,  marginBottom: 10, borderRadius: 5 }]}>
        <Button
          title="Crear cuenta"
          onPress={() => router.push("/login/register" as any)}
          
        />
      </View>

  <View style={[ styles.button,, { backgroundColor: '#fff' }]}>
      <Button
        title="Olvidé mi contraseña"
        onPress={() => router.push("/login/forgot" as any)}
      /> </View>
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
});
