import { View, TextInput, Button, Alert } from "react-native";
import { useState } from "react";
import { Auth } from "aws-amplify";

export default function SignUp() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");

  const onSignUp = async () => {
    try {
      await Auth.signUp({ username: email, password, attributes: { email } });
      Alert.alert("Listo", "Revisa tu correo para confirmar.");
    } catch (e: any) {
      Alert.alert("Error", e.message || "No se pudo registrar");
    }
  };

  return (
    <View style={{ flex:1, padding:16, gap:12, justifyContent:"center" }}>
      <TextInput placeholder="Email" autoCapitalize="none" style={{ borderWidth:1, padding:12, borderRadius:8 }} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry style={{ borderWidth:1, padding:12, borderRadius:8 }} onChangeText={setPassword} />
      <Button title="Crear cuenta" onPress={onSignUp} />
    </View>
  );
}
