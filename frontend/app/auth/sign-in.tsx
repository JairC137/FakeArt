import { View, TextInput, Button, Alert } from "react-native";
import { useState } from "react";
import { Auth } from "aws-amplify";
import { router } from "expo-router";

export default function SignIn() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");

  const onSignIn = async () => {
    try {
      await Auth.signIn(email, password);
      router.replace("/(tabs)"); // a la app
    } catch (e: any) {
      Alert.alert("Error", e.message || "No se pudo iniciar sesión");
    }
  };

  return (
    <View style={{ flex:1, padding:16, gap:12, justifyContent:"center" }}>
      <TextInput placeholder="Email" autoCapitalize="none" style={{ borderWidth:1, padding:12, borderRadius:8 }} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry style={{ borderWidth:1, padding:12, borderRadius:8 }} onChangeText={setPassword} />
      <Button title="Ingresar" onPress={onSignIn} />
    </View>
  );
}
