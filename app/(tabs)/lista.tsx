import { StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
return(
    <View  
    style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}>
     <Text style={{ fontSize: 22 , color:'#fff'}}>Gastos del mes</Text>
      <Text style={{ marginTop: 10 , color:'#fff'}}>
        (Acá listaremos todos los gastos con/sin vencimiento)
      </Text>
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