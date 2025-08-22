import { View, Text, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function UploadScreen() {
  const [uri, setUri] = useState<string | null>(null);

  const pick = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.All, quality: 0.9 });
    if (!res.canceled) setUri(res.assets[0].uri);
  };

  return (
    <View style={{ flex:1, padding:16 }}>
      <Button title="Elegir imagen/video" onPress={pick} />
      {uri ? (<><Text style={{ marginTop:12 }}>{uri}</Text><Image source={{ uri }} style={{ width:"100%", height:300, marginTop:12, borderRadius:12 }}/></>) : null}
    </View>
  );
}
